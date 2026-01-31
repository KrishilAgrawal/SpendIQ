"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, TrendingUp } from "lucide-react";

const trustSignals = [
  {
    icon: Shield,
    title: "Built for real businesses",
    description:
      "Enterprise-grade architecture designed for reliability and scale.",
  },
  {
    icon: Lock,
    title: "Data security",
    description: "Bank-level encryption with role-based access controls.",
  },
  {
    icon: CheckCircle,
    title: "Audit compliance",
    description:
      "Complete transaction trails and approval workflows for auditors.",
  },
  {
    icon: TrendingUp,
    title: "Proven reliability",
    description: "Production-tested financial controls you can depend on.",
  },
];

export function Trust() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
            Enterprise-ready from day one
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with the reliability and compliance standards your business
            requires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 bg-card rounded-lg border border-border"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <signal.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">
                  {signal.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
