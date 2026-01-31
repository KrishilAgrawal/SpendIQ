"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics/types";

interface AnalyticsKPIsProps {
  data: AnalyticsSummary;
  isLoading: boolean;
}

export default function AnalyticsKPIs({ data, isLoading }: AnalyticsKPIsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const isOverBudget = data.utilization > 100;

  const kpis = [
    {
      label: "Total Budget",
      value: data.totalBudget,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Total Actual",
      value: data.totalActual,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Remaining Amount",
      value: data.remaining,
      icon: data.remaining >= 0 ? TrendingUp : TrendingDown,
      color: data.remaining >= 0 ? "text-green-600" : "text-red-600",
      bgColor:
        data.remaining >= 0
          ? "bg-green-50 dark:bg-green-900/20"
          : "bg-red-50 dark:bg-red-900/20",
    },
    {
      label: "Utilization %",
      value: data.utilization,
      icon: Percent,
      color: isOverBudget ? "text-red-600" : "text-gray-600",
      bgColor: isOverBudget
        ? "bg-red-50 dark:bg-red-900/20"
        : "bg-gray-50 dark:bg-gray-900/20",
      isPercentage: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {kpi.label}
            </p>
            <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
          </div>
          <motion.p
            className={`text-3xl font-bold ${kpi.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {kpi.isPercentage
              ? `${kpi.value.toFixed(2)}%`
              : `₹${kpi.value.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </motion.p>
          {kpi.label === "Utilization %" && isOverBudget && (
            <p className="text-xs text-red-600 mt-2 font-medium">Over Budget</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
