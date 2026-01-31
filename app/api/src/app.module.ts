import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./modules/auth/auth.module";
import { MasterDataModule } from "./modules/master-data/master-data.module";
import { BudgetingModule } from "./modules/budgeting/budgeting.module";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { PortalModule } from "./modules/portal/portal.module";
import { AccountingModule } from "./modules/accounting/accounting.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MasterDataModule,
    BudgetingModule,
    TransactionsModule,
    PortalModule,
    AccountingModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
