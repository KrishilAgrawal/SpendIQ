"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { AnalyticPerformance } from "@/lib/analytics/types";

interface AnalyticsChartsProps {
  data: AnalyticPerformance[];
  isLoading: boolean;
}

export default function AnalyticsCharts({
  data,
  isLoading,
}: AnalyticsChartsProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading charts...</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No data available for charts
          </p>
        </div>
      </div>
    );
  }

  // Prepare data for Budget vs Actual chart
  const budgetVsActualData = data.map((item) => ({
    name: item.analyticAccountCode,
    Budget: item.budgeted,
    Actual: item.actual,
  }));

  // Prepare data for Utilization chart
  const utilizationData = data
    .sort((a, b) => b.utilization - a.utilization)
    .map((item) => ({
      name: item.analyticAccountCode,
      utilization: item.utilization,
      isOverBudget: item.isOverBudget,
    }));

  return (
    <div className="space-y-6">
      {/* Budget vs Actual Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Budget vs Actual</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={budgetVsActualData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) =>
                `₹${value.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              }
            />
            <Legend />
            <Bar dataKey="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Actual" fill="#6b7280" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Utilization % Horizontal Bars */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Utilization %</h3>
        <div className="space-y-4">
          {utilizationData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span
                  className={`font-semibold ${
                    item.isOverBudget ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {item.utilization.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.isOverBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(item.utilization, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
