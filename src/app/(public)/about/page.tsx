"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Layers3,
  ShieldCheck,
  Users,
  Sparkles,
  Activity,
  MousePointerClick,
  RefreshCcw,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import LiveCounter from "@/components/LiveCounter/LiveCounter";
import { Button } from "@/components/ui/button";

/* ---------------- ANIMATION ---------------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- DATA ---------------- */

const principles = [
  {
    title: "Operational clarity",
    description: "Every interface is built around what the user needs next.",
    icon: Layers3,
  },
  {
    title: "Reliable circulation",
    description: "Borrowing & returns stay perfectly in sync.",
    icon: BookOpenCheck,
  },
  {
    title: "Secure governance",
    description: "Role-based access ensures institutional trust.",
    icon: ShieldCheck,
  },
  {
    title: "User-first experience",
    description: "Smooth, calm, and modern reading experience.",
    icon: Users,
  },
] as const;

const metrics = [
  { label: "Workflows", value: 12, suffix: "+", icon: Activity },
  { label: "Core features", value: 8, suffix: "", icon: Sparkles },
  { label: "Touchpoints", value: 24, suffix: "+", icon: MousePointerClick },
  { label: "Iterations", value: 30, suffix: "+", icon: RefreshCcw },
] as const;

/* ---------------- COMPONENT ---------------- */

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* GLOW */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-125 w-125 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <motion.main variants={container} initial="hidden" animate="show">
        {/* HERO */}
        <section className="px-6 py-24 md:px-10 xl:px-16">
          <motion.div variants={item} className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-primary">
              About LibraryHub
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-tight xl:text-6xl">
              A modern{" "}
              <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                operating system
              </span>{" "}
              for libraries.
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Simplify catalog management, borrowing workflows, and reader
              experiences — all in one seamless platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/catalog">Explore Catalog</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* METRICS */}
        <section className="px-6 py-16 md:px-10 xl:px-16">
          <motion.div variants={item}>
            <h2 className="mb-10 text-3xl font-semibold">Product in numbers</h2>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-2xl border bg-card/60 backdrop-blur p-6 transition hover:scale-[1.05] hover:shadow-xl"
                  >
                    <Icon className="mb-2 h-5 w-5 text-primary" />

                    <div className="text-4xl font-semibold">
                      <LiveCounter
                        value={metric.value}
                        suffix={metric.suffix}
                      />
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* DIVIDER */}
        <div className="mx-auto my-12 h-px w-1/2 bg-border" />

        {/* PRINCIPLES */}
        <section className="px-6 py-16 md:px-10 xl:px-16">
          <motion.div variants={item} className="mb-12">
            <h2 className="text-4xl font-semibold">
              Built on strong principles
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Designed with clarity, usability, and reliability at its core.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((p) => {
              const Icon = p.icon;

              return (
                <motion.div
                  key={p.title}
                  variants={item}
                  className="group rounded-3xl border bg-card/60 backdrop-blur p-6 transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="flex flex-col items-center justify-between gap-8 rounded-3xl border bg-linear-to-br from-primary/10 via-background to-purple-500/10 p-12 xl:flex-row"
          >
            <div>
              <h2 className="text-4xl font-semibold">
                Ready to modernize your library?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Start using LibraryHub and transform your experience.
              </p>
            </div>

            <div className="flex gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/catalog">Browse</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
};

export default AboutPage;
