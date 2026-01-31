"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalyticsDrilldown } from "@/lib/analytics/api";
import type { AnalyticsFilters } from "@/lib/analytics/types";
import DrilldownTable from "@/components/analytics/DrilldownTable";
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";

export default function AnalyticDrilldownPage() {
  const params = useParams();
  const router = useRouter();
  const analyticId = params.analyticId as string;

  const [analyticAccount, setAnalyticAccount] = useState<any>(null);
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

  // Fetch analytic account details
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/analytical-accounts/${analyticId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAnalyticAccount(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytic account:", error);
      }
    };
    if (analyticId) {
      fetchAccount();
    }
  }, [analyticId]);

  // Fetch drill-down transactions
  const { data: transactions, isLoading } = useAnalyticsDrilldown(
    analyticId,
    filters,
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header with Breadcrumb */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/analytics-dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analytics
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Analytics</span>
          <span>→</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {analyticAccount?.name || "Loading..."}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          {analyticAccount?.name || "Analytic Account"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {analyticAccount?.code} - Transaction Details
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Transactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">To Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <DrilldownTable data={transactions || []} isLoading={isLoading} />
    </div>
  );
}
