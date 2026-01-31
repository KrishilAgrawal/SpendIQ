"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface BudgetDonutChartProps {
  data?: ChartData[];
}

export function BudgetDonutChart({ data = [] }: BudgetDonutChartProps) {
  return (
    <Card className="rounded-[1.5rem] border-none shadow-sm col-span-3">
      <CardHeader className="flex flex-row items-start justify-between pb-0">
        <CardTitle className="text-xl font-bold">Budget</CardTitle>
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
          <ArrowUpRight className="h-5 w-5 text-foreground" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-6">
        {/* Legend Left Side */}
        <div className="space-y-3 w-1/2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-foreground">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Donut Chart Right Side */}
        <div className="relative w-1/2 h-[220px]">
          {/* Floating Badge Removed for Dynamic Data */}

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                cornerRadius={40} // Round edges
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground font-medium">
              Top Budgets
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
