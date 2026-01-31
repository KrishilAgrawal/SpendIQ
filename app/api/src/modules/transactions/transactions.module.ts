import { Module } from "@nestjs/common";
import { InvoicesController } from "./controllers/invoices.controller";
import { InvoicesService } from "./services/invoices.service";
import { PrismaService } from "../../common/database/prisma.service";
import { AccountingModule } from "../accounting/accounting.module";

@Module({
  imports: [AccountingModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class TransactionsModule {}
