export interface AnalyticsFilters {
  startDate: string;
  endDate: string;
  analyticAccountId?: string;
  budgetType?: "INCOME" | "EXPENSE" | "ALL";
  status?: "WITHIN_BUDGET" | "OVER_BUDGET" | "ALL";
}

export interface AnalyticsSummary {
  totalBudget: number;
  totalActual: number;
  remaining: number;
  utilization: number;
}

export interface AnalyticPerformance {
  analyticAccountId: string;
  analyticAccountName: string;
  analyticAccountCode: string;
  budgeted: number;
  actual: number;
  remaining: number;
  utilization: number;
  isOverBudget: boolean;
}

export interface DrilldownTransaction {
  id: string;
  invoiceNumber: string;
  date: string;
  partnerName: string;
  amount: number;
  description: string;
}
