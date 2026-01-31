"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  totalAmount: number; // Changed from amount to match Prisma response usually
  partner: { name: string };
  type: string;
  status: string;
}

interface RecentTransactionsListProps {
  transactions?: Transaction[];
}

export function RecentTransactionsList({
  transactions = [],
}: RecentTransactionsListProps) {
  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="rounded-[1.5rem] border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-xl font-bold">Recent transactions</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 rounded-full px-4 text-xs">
            All accounts <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-9 rounded-full px-4 text-xs">
            See all <ChevronRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-3 bg-[#F8F7FF] text-[#8B5CF6] text-xs font-bold uppercase tracking-wider">
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-right">Amount</div>
            <div className="col-span-3 pl-8">Payment Name</div>
            <div className="col-span-3">Method</div>
            <div className="col-span-3">Category</div>
          </div>

          {/* Table Body */}
          <div className="px-6">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-12 gap-4 px-2 py-5 items-center border-b border-border last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="col-span-2 text-sm text-foreground font-medium">
                  {formatDate(t.date)}
                </div>
                <div className="col-span-1 text-sm font-bold text-foreground text-right">
                  {/* Assuming IN_INVOICE is negative expense, OUT_INVOICE is positive income for now OR based on type */}
                  {t.type === "IN_INVOICE" ? (
                    <span className="text-red-500">
                      - ${Number(t.totalAmount).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-green-500">
                      + ${Number(t.totalAmount).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="col-span-3 flex items-center gap-3 pl-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {t.partner?.name?.charAt(0) || "?"}
                  </div>
                  <span className="font-semibold text-sm truncate">
                    {t.partner?.name || "Unknown"}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-foreground font-medium">
                  {t.status}
                </div>
                <div className="col-span-3 text-sm text-foreground font-medium">
                  {t.type}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No recent transactions
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
