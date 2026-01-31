import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { FilterContactDto } from "./dto/filter-contact.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("contacts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query() filters: FilterContactDto) {
    return this.contactService.findAll(filters);
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  findOne(@Param("id") id: string) {
    return this.contactService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  update(@Param("id") id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(":id/archive")
  @Roles(Role.ADMIN)
  archive(@Param("id") id: string) {
    return this.contactService.archive(id);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  delete(@Param("id") id: string) {
    return this.contactService.delete(id);
  }

  @Post(":id/portal-invite")
  @Roles(Role.ADMIN)
  sendPortalInvitation(@Param("id") id: string) {
    return this.contactService.sendPortalInvitation(id);
  }
}
