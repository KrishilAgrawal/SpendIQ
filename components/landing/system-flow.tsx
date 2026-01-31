"use client";

import { motion } from "framer-motion";
import { FileText, Filter, BarChart2, Bell } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Capture",
    description: "Invoice and purchase order entry",
  },
  {
    icon: Filter,
    title: "Classify",
    description: "Auto analytical allocation",
  },
  {
    icon: BarChart2,
    title: "Monitor",
    description: "Budget vs actual comparison",
  },
  {
    icon: Bell,
    title: "Alert",
    description: "Over-budget warnings",
  },
];

export function SystemFlow() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            A well-architected system that keeps your budgets under control.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+24px)] w-[calc(100%+32px)] h-0.5 bg-border -z-10" />
                )}

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground relative">
                    <step.icon className="h-6 w-6" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            <p>Transactions → Analytics → Budgets → Insights</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
