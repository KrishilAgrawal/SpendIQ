"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See how SpendIQ keeps budgets under control
          </h2>
          <p className="text-lg opacity-90">
            Join businesses that have eliminated budget overruns through
            real-time visibility and automated controls.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-base"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base text-black border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground"
              >
                <Play className="mr-2 h-4 w-4" /> View Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
