"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  GitBranch,
  Bell,
  Building2,
  Users,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Budget vs Actual Tracking",
    description:
      "Monitor spending against budgets in real-time across all departments and cost centers.",
  },
  {
    icon: GitBranch,
    title: "Analytical Account Models",
    description:
      "Automatically allocate transactions to cost centers with intelligent classification rules.",
  },
  {
    icon: Bell,
    title: "Over-Budget Warnings",
    description:
      "Prevent overruns before they happen with automated alerts and approval gates.",
  },
  {
    icon: Building2,
    title: "Cost Center Controls",
    description:
      "Department-level budget enforcement with granular visibility and spending limits.",
  },
  {
    icon: Users,
    title: "Customer/Vendor Portals",
    description:
      "Self-service access for external stakeholders to view invoices and transaction history.",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Reports",
    description:
      "Compliance-grade financial documentation with full transaction trails and approvals.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Enterprise budget accounting
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for real businesses that need reliable financial controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
