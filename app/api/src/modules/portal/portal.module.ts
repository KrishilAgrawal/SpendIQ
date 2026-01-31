import { Module } from "@nestjs/common";
import { PortalController } from "./portal.controller";
import { PortalService } from "./portal.service";
import { PrismaService } from "../../common/database/prisma.service";

@Module({
  controllers: [PortalController],
  providers: [PortalService, PrismaService],
})
export class PortalModule {}
