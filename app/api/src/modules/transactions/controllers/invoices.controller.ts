import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { InvoicesService } from "../services/invoices.service";
import { CreateInvoiceDto } from "../dto/create-invoice.dto";
import { InvoiceType, Role } from "@prisma/client";
import { JwtAuthGuard } from "../../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/roles.decorator";

@Controller("invoices")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(dto);
  }

  @Patch(":id/post")
  @Roles(Role.ADMIN)
  post(@Param("id") id: string) {
    return this.invoicesService.post(id);
  }

  @Get()
  findAll(
    @Query("type") type?: InvoiceType,
    @Query("partnerId") partnerId?: string,
  ) {
    return this.invoicesService.findAll(type, partnerId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.invoicesService.findOne(id);
  }
}
