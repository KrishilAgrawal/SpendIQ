"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Users,
  Target,
} from "lucide-react";

interface Widget {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
}

const availableWidgets: Widget[] = [
  {
    id: "revenue-chart",
    name: "Revenue Chart",
    description: "Track revenue trends over time",
    icon: TrendingUp,
    category: "Analytics",
  },
  {
    id: "expense-breakdown",
    name: "Expense Breakdown",
    description: "Visualize spending by category",
    icon: PieChart,
    category: "Analytics",
  },
  {
    id: "budget-progress",
    name: "Budget Progress",
    description: "Monitor budget utilization",
    icon: Target,
    category: "Budgets",
  },
  {
    id: "cash-flow",
    name: "Cash Flow",
    description: "Track incoming and outgoing funds",
    icon: DollarSign,
    category: "Finance",
  },
  {
    id: "upcoming-bills",
    name: "Upcoming Bills",
    description: "View bills due soon",
    icon: Calendar,
    category: "Transactions",
  },
  {
    id: "recent-invoices",
    name: "Recent Invoices",
    description: "Latest invoice activity",
    icon: FileText,
    category: "Transactions",
  },
  {
    id: "team-activity",
    name: "Team Activity",
    description: "Recent team actions and updates",
    icon: Users,
    category: "Team",
  },
  {
    id: "performance-metrics",
    name: "Performance Metrics",
    description: "Key performance indicators",
    icon: BarChart3,
    category: "Analytics",
  },
];

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget?: (widgetId: string) => void;
}

export function AddWidgetDialog({
  open,
  onOpenChange,
  onAddWidget,
}: AddWidgetDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(availableWidgets.map((w) => w.category)),
  );

  const filteredWidgets = selectedCategory
    ? availableWidgets.filter((w) => w.category === selectedCategory)
    : availableWidgets;

  const handleAddWidget = (widgetId: string) => {
    if (onAddWidget) {
      onAddWidget(widgetId);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Widget to Dashboard</DialogTitle>
          <DialogDescription>
            Choose from available widgets to customize your dashboard view.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWidgets.map((widget) => {
              const Icon = widget.icon;
              return (
                <Card
                  key={widget.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleAddWidget(widget.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          {widget.name}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {widget.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {widget.category}
                      </span>
                      <Button size="sm" variant="ghost">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
