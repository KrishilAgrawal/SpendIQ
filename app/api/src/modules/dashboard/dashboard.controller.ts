import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../../common/auth/jwt-auth.guard";

@Controller("dashboard")
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("metrics")
  async getMetrics() {
    return this.dashboardService.getMetrics();
  }

  @Get("money-flow")
  async getMoneyFlow() {
    return this.dashboardService.getMoneyFlow();
  }

  @Get("recent-transactions")
  async getRecentTransactions() {
    return this.dashboardService.getRecentTransactions();
  }

  @Get("budget-usage")
  async getBudgetUsage() {
    return this.dashboardService.getBudgetUtilization();
  }
}
