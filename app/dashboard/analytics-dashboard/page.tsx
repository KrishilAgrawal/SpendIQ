"use client";

import { useState, useEffect } from "react";
import {
  useAnalyticsSummary,
  useAnalyticsByAccount,
} from "@/lib/analytics/api";
import type { AnalyticsFilters } from "@/lib/analytics/types";
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";
import AnalyticsKPIs from "@/components/analytics/AnalyticsKPIs";
import AnalyticsTable from "@/components/analytics/AnalyticsTable";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";

export default function AnalyticsDashboardPage() {
  // Initialize filters with current month
  const [filters, setFilters] = useState<AnalyticsFilters>(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      startDate: firstDayOfMonth.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      budgetType: "ALL",
      status: "ALL",
    };
  });

  const [analyticAccounts, setAnalyticAccounts] = useState<any[]>([]);

  // Fetch analytic accounts for filter dropdown
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/analytical-accounts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAnalyticAccounts(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytic accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  // Fetch analytics data
  const { data: summaryData, isLoading: summaryLoading } =
    useAnalyticsSummary(filters);
  const { data: performanceData, isLoading: performanceLoading } =
    useAnalyticsByAccount(filters);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Analytical Performance
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Budget vs Actual by Cost Center
        </p>
      </div>

      {/* Filters */}
      <AnalyticsFilters
        filters={filters}
        onFiltersChange={setFilters}
        analyticAccounts={analyticAccounts}
      />

      {/* KPI Summary */}
      <AnalyticsKPIs
        data={
          summaryData || {
            totalBudget: 0,
            totalActual: 0,
            remaining: 0,
            utilization: 0,
          }
        }
        isLoading={summaryLoading}
      />

      {/* Cost Center Performance Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cost Center Performance</h2>
        <AnalyticsTable
          data={performanceData || []}
          isLoading={performanceLoading}
        />
      </div>

      {/* Visual Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Visual Analytics</h2>
        <AnalyticsCharts
          data={performanceData || []}
          isLoading={performanceLoading}
        />
      </div>
    </div>
  );
}
