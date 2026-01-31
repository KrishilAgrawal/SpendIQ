import { Module } from "@nestjs/common";
import { JournalEntriesService } from "./services/journal-entries.service";
import { JournalEntriesController } from "./controllers/journal-entries.controller";
import { PrismaService } from "../../common/database/prisma.service";

@Module({
  controllers: [JournalEntriesController],
  providers: [JournalEntriesService, PrismaService],
  exports: [JournalEntriesService], // Export service for InvoicesModule integration
})
export class AccountingModule {}
