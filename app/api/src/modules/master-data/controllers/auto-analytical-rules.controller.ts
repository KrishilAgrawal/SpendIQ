import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AutoAnalyticalService } from "../services/auto-analytical.service";
import { JwtAuthGuard } from "../../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("auto-analytical-rules")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AutoAnalyticalRulesController {
  constructor(private readonly service: AutoAnalyticalService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  delete(@Param("id") id: string) {
    return this.service.delete(id);
  }
}
