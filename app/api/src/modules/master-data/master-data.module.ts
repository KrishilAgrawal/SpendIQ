import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module";
import { ContactsService } from "./services/contacts.service";
import { ProductsService } from "./services/products.service";
import { AnalyticalAccountsService } from "./services/analytical-accounts.service";
import { AutoAnalyticalService } from "./services/auto-analytical.service";
import { PrismaService } from "../../common/database/prisma.service";
import { ContactsController } from "./controllers/contacts.controller";
import { ProductsController } from "./controllers/products.controller";
import { AnalyticalAccountsController } from "./controllers/analytical-accounts.controller";
import { AutoAnalyticalRulesController } from "./controllers/auto-analytical-rules.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    ContactsController,
    ProductsController,
    AnalyticalAccountsController,
    AutoAnalyticalRulesController,
  ],
  providers: [
    ContactsService,
    ProductsService,
    AnalyticalAccountsService,
    AutoAnalyticalService,
    PrismaService,
  ],
  exports: [
    ContactsService,
    ProductsService,
    AnalyticalAccountsService,
    AutoAnalyticalService,
  ],
})
export class MasterDataModule {}
