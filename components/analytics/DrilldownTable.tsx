"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DrilldownTransaction } from "@/lib/analytics/types";

interface DrilldownTableProps {
  data: DrilldownTransaction[];
  isLoading: boolean;
}

export default function DrilldownTable({
  data,
  isLoading,
}: DrilldownTableProps) {
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
          No transactions found for this analytic account in the selected date
          range.
        </p>
      </div>
    );
  }

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden">
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Transaction Details</h3>
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total: </span>
            <span className="font-bold text-lg">
              ₹
              {totalAmount.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {data.length} transaction{data.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.invoiceNumber}
                </TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{transaction.partnerName}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {transaction.description || "-"}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ₹
                  {transaction.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
