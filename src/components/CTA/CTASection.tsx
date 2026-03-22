"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Compass, LibraryBig, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--color-primary)_78%,black)_0%,color-mix(in_oklch,var(--color-primary)_42%,var(--color-accent))_100%)] px-8 py-12 text-primary-foreground shadow-[0_32px_90px_-44px_rgba(20,33,61,0.42)] sm:px-12 sm:py-14">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/images/covers/pattern.svg')" }} />
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-white/88">
                <LibraryBig className="h-3.5 w-3.5" />
                Ready To Launch
              </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
                className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.07em] text-white sm:text-5xl"
        >
                Ready to experience the future of library management?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
                className="mt-5 max-w-2xl text-lg leading-9 text-white/78"
        >
                Create an account to explore the full range of features, or browse the catalog to see our new design in action.
        </motion.p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Compass, label: "Discovery-led browsing" },
                  { icon: ShieldCheck, label: "Clearer account flows" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm text-white/82"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
              className="flex flex-col gap-4 lg:min-w-[260px]"
        >
          <Link href="/register" passHref>
            <Button
              size="lg"
                  className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-foreground shadow-xl hover:bg-white/92"
            >
                  Create account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
                <Link href="/catalog" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-2xl border-white/22 bg-white/8 px-8 text-base font-semibold text-white hover:bg-white/12"
                  >
                    Browse catalog
                  </Button>
                </Link>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
