"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Building2 } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Budget overruns discovered too late",
    description:
      "By the time you notice spending is out of control, the damage is already done.",
    solution:
      "Real-time tracking with automated alerts the moment budgets approach their limits.",
  },
  {
    icon: TrendingDown,
    title: "Spreadsheets break at scale",
    description:
      "Manual tracking becomes impossible as your organization grows and complexity increases.",
    solution:
      "Centralized analytical accounting that automatically allocates transactions to cost centers.",
  },
  {
    icon: Building2,
    title: "No cost center visibility",
    description:
      "Department managers lack insight into their own spending, making budget control impossible.",
    solution:
      "Department-level budget controls with granular visibility and approval workflows.",
  },
];

export function ProblemSolution() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
            Why budget systems fail
          </h2>
          <p className="text-lg text-muted-foreground">
            Traditional approaches leave businesses vulnerable to cost overruns
            and financial surprises.
          </p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Problem */}
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10 text-destructive">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block">
                <svg
                  className="w-12 h-12 text-muted-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Solution */}
              <div className="flex-1 space-y-3 bg-card p-6 rounded-lg border border-border">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-primary">
                    Solution
                  </span>
                </div>
                <p className="text-foreground font-medium leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
