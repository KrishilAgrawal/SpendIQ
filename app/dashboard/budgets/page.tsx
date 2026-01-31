"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function BudgetListPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await apiRequest("/budgets");
      if (Array.isArray(data)) {
        setBudgets(data);
      }
    } catch (error) {
      console.error("Failed to fetch budgets", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading budgets...</div>;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">
            Manage and track departmental allocations.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> New Budget
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Active Budgets
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search budgets..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Budget Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => {
                // Ensure number types
                const spent = Number(budget.spent) || 0;
                const allocated = Number(budget.allocated) || 0;
                const utilization =
                  allocated > 0 ? (spent / allocated) * 100 : 0;

                return (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/dashboard/budgets/${budget.id}`}
                        className="hover:underline text-primary"
                      >
                        {budget.name}
                      </Link>
                    </TableCell>
                    <TableCell>{budget.department}</TableCell>
                    <TableCell className="text-right">
                      ${budget.allocated.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${budget.spent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-muted-foreground">
                          {utilization.toFixed(1)}%
                        </span>
                        <div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${Math.min(utilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          budget.status === "Warning" ? "warning" : "default"
                        }
                      >
                        {budget.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
