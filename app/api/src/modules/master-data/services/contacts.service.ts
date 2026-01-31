import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/database/prisma.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { ContactType } from "@prisma/client";

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  async findAll(type?: ContactType) {
    return this.prisma.contact.findMany({
      where: type ? { type } : undefined,
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string) {
    return this.prisma.contact.findUnique({
      where: { id },
      include: {
        invoices: { take: 5, orderBy: { date: "desc" } },
        payments: { take: 5, orderBy: { date: "desc" } },
      },
    });
  }
}
