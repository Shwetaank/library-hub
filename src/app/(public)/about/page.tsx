"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Library,
  Shield,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLiveCounter } from "@/hooks/useLiveCounter";
import LiveCounter from "@/components/LiveCounter/LiveCounter";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

type ValueCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const AboutPage: React.FC = () => {
  const readers = useLiveCounter(5000, 4950, 5100);
  const books = useLiveCounter(1000, 995, 1010);
  const transactions = useLiveCounter(500, 480, 520);

  const values: ValueCard[] = [
    {
      icon: BookOpen,
      title: "Smart Book Discovery",
      description:
        "Search, browse, and filter across a growing catalog with clearer visibility into what is available now.",
    },
    {
      icon: Users,
      title: "Reader-Centered Workflows",
      description:
        "Give readers and operators a calmer, more organized experience for borrowing, returns, and activity tracking.",
    },
    {
      icon: Zap,
      title: "Real-Time Operations",
      description:
        "Reduce lag in everyday library work with live updates around availability, circulation, and transaction flow.",
    },
    {
      icon: Shield,
      title: "Secure and Reliable",
      description:
        "Support trusted operations through role-based access, reliable authentication, and safer data handling.",
    },
  ];

  const metrics = [
    { data: readers, label: "Active Readers" },
    { data: books, label: "Available Titles" },
    { data: transactions, label: "Daily Transactions" },
  ];

  return (
    <div className="page-surface">
      <section className="relative overflow-hidden px-6 py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.12),transparent_24%)]" />
        <div className="noise-grid pointer-events-none absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="container relative mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
              >
                <Library className="mr-1.5 h-3.5 w-3.5" />
                About LibraryHub
              </Badge>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                <span className="accent-text">
                  Built to make modern library operations feel clear, fast, and dependable
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                LibraryHub is a modern library management platform designed for
                discovery, circulation, member workflows, and operational
                visibility. It helps teams replace scattered processes with a
                more focused product experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-linear-to-r from-primary to-secondary px-8 text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.55)] sm:w-auto"
                >
                  <Link href="/books">
                    Explore Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-primary/10 bg-background/78 px-8 sm:w-auto"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Catalog intelligence", "Reader workflows", "Live visibility"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-shell p-5 sm:p-6">
              <div className="grid gap-4">
                <Card className="glass-panel rounded-[1.5rem] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Product Direction</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        What LibraryHub optimizes for
                      </p>
                    </div>
                    <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Live Product
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Clearer book discovery and availability",
                      "Faster circulation and member updates",
                      "A calmer operator workflow from one system",
                    ].map((line) => (
                      <div
                        key={line}
                        className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/75 px-4 py-3"
                      >
                        <Sparkles className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-foreground/85">{line}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="glass-panel rounded-[1.5rem] p-5">
                    <div className="mb-3 inline-flex rounded-full border border-primary/15 bg-primary/10 p-2 text-primary">
                      <Award className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      Mission
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Simplify how readers and library teams interact with books,
                      borrowing, accounts, and day-to-day operations.
                    </p>
                  </Card>

                  <Card className="glass-panel rounded-[1.5rem] p-5">
                    <div className="mb-3 inline-flex rounded-full border border-secondary/15 bg-secondary/10 p-2 text-secondary">
                      <Users className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      Experience
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Deliver a cleaner reader journey and more reliable operator
                      flow through one connected product surface.
                    </p>
                  </Card>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-panel mesh-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.1),transparent_26%),linear-gradient(135deg,rgba(79,70,229,0.05),transparent_50%,rgba(245,158,11,0.08))]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div>
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary"
                >
                  Our Mission
                </Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  A better operating flow for everyday library work
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  LibraryHub exists to simplify the way libraries run. From
                  discovering books to managing circulation and tracking member
                  activity, the goal is to remove friction and bring more clarity
                  to the full experience.
                </p>
                <p>
                  Rather than treating library management like a collection of
                  isolated tools, LibraryHub is shaped like a connected product:
                  easier to understand, faster to operate, and more dependable
                  for teams and readers alike.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <Badge
              variant="outline"
              className="rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary"
            >
              Live Platform Metrics
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Real-time signals from the platform
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              A quick look at the kinds of activity LibraryHub is built to support.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {metrics.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <Card className="glass-panel mesh-card rounded-[1.6rem] p-6 text-center">
                  <div className="mb-4 inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Live
                  </div>

                  <LiveCounter value={stat.data.count} />

                  <div
                    className={`mt-3 text-sm font-semibold ${
                      stat.data.direction === "up"
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    {stat.data.direction === "up" ? "+" : ""}
                    {stat.data.percentage}%{" "}
                    {stat.data.direction === "up" ? "\u2191" : "\u2193"}
                  </div>

                  <p className="mt-4 text-base text-foreground/80">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Product values that shape the experience
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              The principles behind how LibraryHub is designed and built.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div key={value.title} variants={fadeUp} className="h-full">
                  <Card className="glass-panel mesh-card h-full rounded-[1.6rem] p-6">
                    <div className="mb-5 inline-flex rounded-[1rem] border border-primary/15 bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-panel mesh-card relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_28%),linear-gradient(135deg,rgba(79,70,229,0.05),transparent_45%,rgba(245,158,11,0.08))]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ready to explore the product in action?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Discover books, review platform flow, and move into the library
                experience through a clearer, product-grade interface.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-linear-to-r from-primary to-secondary px-8 text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.55)] sm:w-auto"
                >
                  <Link href="/books">
                    Explore Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-primary/10 bg-background/78 px-8 sm:w-auto"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
