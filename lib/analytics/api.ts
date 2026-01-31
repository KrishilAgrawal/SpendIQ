import { useQuery } from "@tanstack/react-query";
import type {
  AnalyticsFilters,
  AnalyticsSummary,
  AnalyticPerformance,
  DrilldownTransaction,
} from "./types";

const API_BASE_URL = "http://localhost:4000";

/**
 * Build query string from filters
 */
function buildQueryString(filters: AnalyticsFilters): string {
  const params = new URLSearchParams();
  params.append("startDate", filters.startDate);
  params.append("endDate", filters.endDate);

  if (filters.analyticAccountId) {
    params.append("analyticAccountId", filters.analyticAccountId);
  }
  if (filters.budgetType) {
    params.append("budgetType", filters.budgetType);
  }
  if (filters.status) {
    params.append("status", filters.status);
  }

  return params.toString();
}

/**
 * Fetch analytics summary KPIs
 */
async function fetchAnalyticsSummary(
  filters: AnalyticsFilters,
): Promise<AnalyticsSummary> {
  const token = localStorage.getItem("accessToken");
  const queryString = buildQueryString(filters);

  const response = await fetch(
    `${API_BASE_URL}/analytics/summary?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics summary");
  }

  return response.json();
}

/**
 * Fetch analytics by analytic account
 */
async function fetchAnalyticsByAccount(
  filters: AnalyticsFilters,
): Promise<AnalyticPerformance[]> {
  const token = localStorage.getItem("accessToken");
  const queryString = buildQueryString(filters);

  const response = await fetch(
    `${API_BASE_URL}/analytics/by-analytic?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics by account");
  }

  return response.json();
}

/**
 * Fetch drill-down transactions for specific analytic account
 */
async function fetchAnalyticsDrilldown(
  analyticId: string,
  filters: AnalyticsFilters,
): Promise<DrilldownTransaction[]> {
  const token = localStorage.getItem("accessToken");
  const queryString = buildQueryString(filters);

  const response = await fetch(
    `${API_BASE_URL}/analytics/${analyticId}/drilldown?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics drilldown");
  }

  return response.json();
}

/**
 * TanStack Query hook for analytics summary
 */
export function useAnalyticsSummary(filters: AnalyticsFilters) {
  return useQuery({
    queryKey: ["analytics", "summary", filters],
    queryFn: () => fetchAnalyticsSummary(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * TanStack Query hook for analytics by account
 */
export function useAnalyticsByAccount(filters: AnalyticsFilters) {
  return useQuery({
    queryKey: ["analytics", "by-account", filters],
    queryFn: () => fetchAnalyticsByAccount(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * TanStack Query hook for analytics drilldown
 */
export function useAnalyticsDrilldown(
  analyticId: string,
  filters: AnalyticsFilters,
) {
  return useQuery({
    queryKey: ["analytics", "drilldown", analyticId, filters],
    queryFn: () => fetchAnalyticsDrilldown(analyticId, filters),
    enabled: !!analyticId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
