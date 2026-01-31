import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { JournalEntriesService } from "../services/journal-entries.service";
import { JwtAuthGuard } from "../../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("journal-entries")
@UseGuards(JwtAuthGuard, RolesGuard)
export class JournalEntriesController {
  constructor(private readonly service: JournalEntriesService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    // Basic manual creation endpoint
    return this.service.create({
      date: new Date(body.date),
      reference: body.reference,
      lines: body.lines,
    });
  }

  @Post(":id/post")
  @Roles(Role.ADMIN)
  post(@Param("id") id: string) {
    return this.service.post(id);
  }
}
