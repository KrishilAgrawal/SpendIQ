"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Control budgets before they become problems
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Enterprise budget accounting that prevents overruns, enforces
                cost center controls, and provides real-time visibility into
                spending across your organization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                <Play className="mr-2 h-4 w-4" /> View Demo
              </Button>
            </motion.div>
          </div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            className="flex-1 relative w-full max-w-xl lg:max-w-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
              {/* Window Controls */}
              <div className="h-10 border-b border-border bg-muted/30 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-6 space-y-4 bg-muted/10 min-h-[360px]">
                {/* Header Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {["Budget", "Actual", "Variance"].map((label, i) => (
                    <div
                      key={i}
                      className="h-20 rounded-md bg-card border border-border p-3"
                    >
                      <div className="h-2 w-16 bg-muted rounded mb-2" />
                      <div className="h-3 w-12 bg-muted-foreground/20 rounded" />
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="h-48 rounded-md bg-card border border-border p-4 flex items-end gap-2">
                  {[65, 45, 80, 55, 75, 60, 85, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/70 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
