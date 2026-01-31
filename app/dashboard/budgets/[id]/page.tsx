"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Download, PenLine } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Activity, DollarSign, PieChart } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { EditBudgetDialog } from "@/components/budgets/edit-budget-dialog";
import { exportBudgetToCSV } from "@/lib/export-utils";

export default function BudgetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [budget, setBudget] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    fetchBudget();
  }, [id]);

  async function fetchBudget() {
    try {
      const data = await apiRequest(`/budgets/${id}`);
      setBudget(data);
    } catch (error) {
      console.error("Failed to fetch budget:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading budget...</div>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-muted-foreground">Budget not found</div>
        <Link href="/dashboard/budgets">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Budgets
          </Button>
        </Link>
      </div>
    );
  }

  const allocated =
    budget.lines?.reduce(
      (sum: number, line: any) => sum + Number(line.plannedAmount || 0),
      0,
    ) || 0;
  const spent = 0; // TODO: Calculate from transactions
  const remaining = allocated - spent;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/budgets">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{budget.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>{budget.department?.name || "General"}</span>
              <span>•</span>
              <span>Fiscal Year {budget.fiscalYear}</span>
              <Badge
                variant={
                  budget.status === "APPROVED"
                    ? "default"
                    : budget.status === "DRAFT"
                      ? "secondary"
                      : "warning"
                }
                className="ml-2"
              >
                {budget.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => exportBudgetToCSV({ ...budget, allocated, spent })}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setShowEditDialog(true)}>
            <PenLine className="mr-2 h-4 w-4" /> Edit Budget
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Total Allocated"
          value={`$${allocated.toLocaleString()}`}
          icon={DollarSign}
        />
        <KPICard
          title="Actual Spent"
          value={`$${spent.toLocaleString()}`}
          icon={Activity}
        />
        <KPICard
          title="Remaining"
          value={`$${remaining.toLocaleString()}`}
          icon={PieChart}
          trend={
            remaining < 0
              ? "Over budget"
              : `${remaining.toLocaleString()} remaining`
          }
          trendUp={remaining >= 0}
        />
      </div>

      {/* Budget Lines */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Line Items</CardTitle>
          <CardDescription>Planned allocations for this budget</CardDescription>
        </CardHeader>
        <CardContent>
          {budget.lines && budget.lines.length > 0 ? (
            <div className="space-y-3">
              {budget.lines.map((line: any, index: number) => (
                <div
                  key={line.id || index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">
                      {line.description || `Line Item ${index + 1}`}
                    </div>
                    {line.product && (
                      <div className="text-sm text-muted-foreground">
                        Product: {line.product.name}
                      </div>
                    )}
                  </div>
                  <div className="text-right font-semibold">
                    ${Number(line.plannedAmount || 0).toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg font-bold">
                <div>Total</div>
                <div>${allocated.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-center py-10 text-muted-foreground">
              No budget line items yet. Click &quot;Edit Budget&quot; to add
              some.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions for this budget */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest expenses charged to this budget.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-center py-10 text-muted-foreground">
            Transaction tracking coming soon. This will show expenses linked to
            this budget.
          </div>
        </CardContent>
      </Card>

      <EditBudgetDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        budgetId={id}
        onSuccess={fetchBudget}
      />
    </div>
  );
}
