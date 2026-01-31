"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import type { AnalyticPerformance } from "@/lib/analytics/types";

interface AnalyticsTableProps {
  data: AnalyticPerformance[];
  isLoading: boolean;
}

export default function AnalyticsTable({
  data,
  isLoading,
}: AnalyticsTableProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<"utilization" | "budgeted">(
    "utilization",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border">
        <div className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No analytics data found for the selected filters.
        </p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = sortBy === "utilization" ? a.utilization : a.budgeted;
    const bValue = sortBy === "utilization" ? b.utilization : b.budgeted;
    return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (column: "utilization" | "budgeted") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const handleRowClick = (analyticId: string) => {
    router.push(`/dashboard/analytics/${analyticId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Analytic Account</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("budgeted")}
              >
                <div className="flex items-center gap-2">
                  Budgeted Amount
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Actual Amount</TableHead>
              <TableHead>Remaining Amount</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("utilization")}
              >
                <div className="flex items-center gap-2">
                  Utilization %
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow
                key={row.analyticAccountId}
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  row.isOverBudget ? "bg-red-50/50 dark:bg-red-900/10" : ""
                }`}
                onClick={() => handleRowClick(row.analyticAccountId)}
              >
                <TableCell className="font-medium">
                  <div>
                    <p className="font-semibold">{row.analyticAccountName}</p>
                    <p className="text-sm text-gray-500">
                      {row.analyticAccountCode}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  ₹
                  {row.budgeted.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  ₹
                  {row.actual.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell
                  className={
                    row.remaining < 0 ? "text-red-600 font-semibold" : ""
                  }
                >
                  ₹
                  {row.remaining.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      row.isOverBudget ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {row.utilization.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={row.isOverBudget ? "destructive" : "default"}
                    className={
                      row.isOverBudget
                        ? ""
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    }
                  >
                    {row.isOverBudget ? "Over Budget" : "Within Budget"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
