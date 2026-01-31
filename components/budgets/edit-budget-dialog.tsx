"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api";
import { Loader2, Plus, Trash2 } from "lucide-react";

const budgetLineSchema = z.object({
  description: z.string().optional(),
  plannedAmount: z.number().min(0, "Amount must be positive"),
  productId: z.string().optional(),
});

const budgetSchema = z.object({
  name: z.string().min(3, "Budget name must be at least 3 characters"),
  fiscalYear: z.number().min(2020).max(2100),
  departmentId: z.string().optional(),
  lines: z.array(budgetLineSchema),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface EditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budgetId: string;
  onSuccess?: () => void;
}

export function EditBudgetDialog({
  open,
  onOpenChange,
  budgetId,
  onSuccess,
}: EditBudgetDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [budgetStatus, setBudgetStatus] = useState<string | null>(null);

  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: "",
      fiscalYear: new Date().getFullYear(),
      departmentId: "",
      lines: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
  });

  // Fetch budget data when dialog opens
  useEffect(() => {
    if (open && budgetId) {
      fetchBudgetData();
    }
  }, [open, budgetId]);

  async function fetchBudgetData() {
    setIsFetching(true);
    try {
      const budget = await apiRequest(`/budgets/${budgetId}`);
      setBudgetStatus(budget.status);
      form.reset({
        name: budget.name,
        fiscalYear: budget.fiscalYear,
        departmentId: budget.departmentId || "",
        lines: budget.lines || [],
      });
    } catch (e: any) {
      console.error("[EditBudget] Failed to fetch:", e);
      setError("Failed to load budget data");
    } finally {
      setIsFetching(false);
    }
  }

  async function onSubmit(values: BudgetFormData) {
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        name: values.name,
        fiscalYear: values.fiscalYear,
        departmentId:
          values.departmentId && values.departmentId.trim() !== ""
            ? values.departmentId
            : undefined,
        lines: values.lines.map((line) => ({
          description: line.description || "",
          plannedAmount: line.plannedAmount,
          productId: line.productId || undefined,
        })),
      };

      // Use different endpoints based on budget status
      if (budgetStatus === "DRAFT") {
        // Update draft budget directly
        await apiRequest(`/budgets/${budgetId}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        // Create a revision for approved budgets
        await apiRequest(`/budgets/${budgetId}/revise`, {
          method: "POST",
          body: payload,
        });
      }

      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }

      router.refresh();
    } catch (e: any) {
      console.error("[EditBudget] Failed:", e);
      setError(e?.message || "Failed to update budget. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>
            {budgetStatus === "DRAFT"
              ? "Update this draft budget. You can modify all fields and budget lines."
              : "Create a new revision of this budget. The current version will be archived."}
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Budget Name</Label>
              <Input
                id="name"
                placeholder="e.g., Marketing Q1 2024"
                disabled={isLoading}
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalYear">Fiscal Year</Label>
              <Input
                id="fiscalYear"
                type="number"
                placeholder="2024"
                disabled={isLoading}
                {...form.register("fiscalYear", { valueAsNumber: true })}
              />
              {form.formState.errors.fiscalYear && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.fiscalYear.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="departmentId">Department ID (Optional)</Label>
              <Input
                id="departmentId"
                placeholder="Leave empty for general budget"
                disabled={isLoading}
                {...form.register("departmentId")}
              />
            </div>

            {/* Budget Lines */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Budget Line Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ description: "", plannedAmount: 0 })}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Line
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No budget lines yet. Click "Add Line" to create one.
                </p>
              )}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-2 items-start p-3 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Description"
                      disabled={isLoading}
                      {...form.register(`lines.${index}.description`)}
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Planned Amount"
                      disabled={isLoading}
                      {...form.register(`lines.${index}.plannedAmount`, {
                        valueAsNumber: true,
                      })}
                    />
                    {form.formState.errors.lines?.[index]?.plannedAmount && (
                      <p className="text-xs text-destructive">
                        {
                          form.formState.errors.lines[index]?.plannedAmount
                            ?.message
                        }
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || isFetching}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
