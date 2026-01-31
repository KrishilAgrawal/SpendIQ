import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PortalService } from "./portal.service";
import { JwtAuthGuard } from "../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("portal")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Get("invoices")
  @Roles(Role.PORTAL_USER, Role.ADMIN) // Admin can test too
  getMyInvoices(@Request() req) {
    return this.portalService.getMyInvoices(req.user.id);
  }

  @Post("invoices/:id/pay")
  @Roles(Role.PORTAL_USER)
  payInvoice(@Param("id") id: string, @Request() req) {
    return this.portalService.payInvoice(id, req.user.id);
  }
}
