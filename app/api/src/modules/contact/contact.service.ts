import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { MailService } from "../mail/mail.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { FilterContactDto } from "./dto/filter-contact.dto";
import { Status, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async findAll(filters: FilterContactDto) {
    const {
      search,
      type,
      isPortalUser,
      status,
      page = "1",
      limit = "50",
    } = filters;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (isPortalUser !== undefined) {
      where.isPortalUser = isPortalUser;
    }

    if (status) {
      where.status = status;
    } else {
      // Default: only show active contacts
      where.status = Status.ACTIVE;
    }

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          portalUser: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.contact.count({ where }),
    ]);

    return {
      data: contacts,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        portalUser: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  async create(createContactDto: CreateContactDto) {
    // Check if email already exists
    const existingContact = await this.prisma.contact.findUnique({
      where: { email: createContactDto.email },
    });

    if (existingContact) {
      throw new ConflictException("A contact with this email already exists");
    }

    const { tagIds, ...contactData } = createContactDto;

    const contact = await this.prisma.contact.create({
      data: {
        ...contactData,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);

    // Check if email is being changed and if it's already taken
    if (updateContactDto.email && updateContactDto.email !== contact.email) {
      const existingContact = await this.prisma.contact.findUnique({
        where: { email: updateContactDto.email },
      });

      if (existingContact) {
        throw new ConflictException("A contact with this email already exists");
      }
    }

    const { tagIds, ...contactData } = updateContactDto;

    // Handle tag updates
    let tagUpdate = {};
    if (tagIds !== undefined) {
      // Delete existing tags and create new ones
      tagUpdate = {
        tags: {
          deleteMany: {},
          create: tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      };
    }

    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: {
        ...contactData,
        ...tagUpdate,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        portalUser: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return updatedContact;
  }

  async archive(id: string) {
    const contact = await this.findOne(id);

    const archivedContact = await this.prisma.contact.update({
      where: { id },
      data: { status: Status.ARCHIVED },
    });

    return archivedContact;
  }

  async delete(id: string) {
    const contact = await this.findOne(id);

    await this.prisma.contact.delete({
      where: { id },
    });

    return { message: "Contact deleted successfully" };
  }

  async sendPortalInvitation(id: string) {
    const contact = await this.findOne(id);

    if (contact.isPortalUser && contact.portalUserId) {
      throw new BadRequestException("This contact already has portal access");
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create portal user
    const portalUser = await this.prisma.user.create({
      data: {
        loginId: contact.email,
        email: contact.email,
        password: hashedPassword,
        name: contact.name,
        role: Role.PORTAL_USER,
      },
    });

    // Update contact with portal user reference
    await this.prisma.contact.update({
      where: { id },
      data: {
        isPortalUser: true,
        portalUserId: portalUser.id,
      },
    });

    // Send portal invitation email
    await this.mailService.sendPortalInvitation(
      contact.email,
      contact.name,
      tempPassword,
    );

    return {
      message: "Portal invitation sent successfully",
      portalUserId: portalUser.id,
    };
  }
}
