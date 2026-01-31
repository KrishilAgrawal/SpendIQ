import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module";
import { BudgetsService } from "./services/budgets.service";
import { BudgetsController } from "./controllers/budgets.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService],
})
export class BudgetingModule {}
