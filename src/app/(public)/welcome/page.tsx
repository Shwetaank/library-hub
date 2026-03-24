"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  LibraryBig,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    transition: { duration: 0.35, ease },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const REDIRECT_SECONDS = 7;

const highlights = [
  {
    icon: ScanSearch,
    title: "Discovery flow ready",
    description:
      "Search, browse, and move into book details with a calmer, faster experience.",
  },
  {
    icon: LibraryBig,
    title: "Borrowing system synced",
    description:
      "Availability, lending actions, and catalog structure are prepared for your next session.",
  },
  {
    icon: Sparkles,
    title: "Workspace polished",
    description:
      "The same visual language now connects the public experience with the product flow.",
  },
];

const statusItems = [
  "System initialized",
  "Catalog connected",
  "Availability in sync",
];

const nextSteps = [
  "Open the main experience and continue where LibraryHub starts.",
  "Browse the catalog to explore titles, authors, and availability.",
  "Let the page redirect automatically if you want a seamless handoff.",
];

const quickStats = [
  {
    label: "Redirect",
    value: "Auto handoff enabled",
  },
  {
    label: "Entry point",
    value: "Home and catalog ready",
  },
  {
    label: "Experience",
    value: "Full-width welcome flow",
  },
];

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(() => router.push("/"), 400);
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="page-surface relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[56px_56px] opacity-[0.16]" />
      <div className="absolute left-[-10%] top-10 -z-10 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-8%] top-[18%] -z-10 h-96 w-96 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="absolute bottom-[-8%] left-[20%] -z-10 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

      <AnimatePresence>
        {!exit && (
          <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex min-h-screen w-full flex-col"
          >
            <section className="px-6 pb-8 pt-8 md:px-10 xl:px-16">
              <div className="grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
                <motion.section
                  variants={item}
                  className="relative overflow-hidden rounded-[2.4rem] border border-border/80 bg-card/94 px-6 py-10 shadow-[0_32px_80px_-56px_rgba(20,33,61,0.24)] sm:px-8 lg:px-10 lg:py-12"
                >
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(198,151,87,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(63,86,109,0.14),transparent_30%)]" />

                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/82 px-4 py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.24em] text-primary shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Welcome flow ready
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                      <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-6xl xl:text-7xl">
                        Welcome to LibraryHub.
                        <span className="mt-2 block bg-linear-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
                          Your next session now opens wide.
                        </span>
                      </h1>

                      <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
                        Everything is prepared for a calmer return into the
                        product. Explore the platform, browse the catalog, or
                        let the automatic handoff move you into the main
                        experience without friction.
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        {statusItems.map((status) => (
                          <div
                            key={status}
                            className="stat-chip flex items-center gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>{status}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button
                          asChild
                          size="lg"
                          className="btn-brand h-12 rounded-full px-8 text-base"
                        >
                          <Link href="/">
                            Enter LibraryHub
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="h-12 rounded-full px-8 text-base hover:border-primary hover:text-primary"
                        >
                          <Link href="/catalog">Browse catalog</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 self-start">
                      {quickStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-[1.5rem] border border-border/80 bg-background/72 p-5 shadow-sm backdrop-blur-sm"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/78">
                            {stat.label}
                          </p>
                          <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                <motion.aside
                  variants={item}
                  className="rail-shell relative flex h-full flex-col justify-between overflow-hidden rounded-[2.1rem] p-6 sm:p-8"
                >
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%)]" />

                  <div>
                    <div className="ink-panel px-4 py-3">
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/72">
                        <Clock3 className="h-4 w-4" />
                        Redirect status
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-sm uppercase tracking-[0.24em] text-primary-foreground/60">
                        Automatic handoff
                      </p>
                      <div className="mt-4 flex items-end gap-4">
                        <div className="text-7xl font-semibold leading-none tracking-[-0.08em]">
                          {countdown}
                        </div>
                        <p className="max-w-40 pb-2 text-sm leading-6 text-primary-foreground/72">
                          seconds until we send you back to the main experience
                        </p>
                      </div>

                      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/14">
                        <motion.div
                          className="h-full rounded-full bg-white"
                          animate={{
                            width: `${(countdown / REDIRECT_SECONDS) * 100}%`,
                          }}
                          transition={{ duration: 0.8, ease }}
                        />
                      </div>
                    </div>

                    <div className="mt-10 space-y-3">
                      {nextSteps.map((step, index) => (
                        <div
                          key={step}
                          className="ink-panel flex items-start gap-3 px-4 py-4"
                        >
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/12 text-xs font-semibold text-white">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-7 text-primary-foreground/82">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 rounded-[1.45rem] border border-white/12 bg-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-primary-foreground/60">
                          Continue now
                        </p>
                        <p className="mt-1 text-base font-medium text-primary-foreground">
                          Pick your next path before redirect.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="h-12 rounded-full border border-white/14 "
                      >
                        <Link href="/">
                          Open home
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-12 rounded-full border-white/18 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                      >
                        <Link href="/catalog">Open catalog</Link>
                      </Button>
                    </div>
                  </div>
                </motion.aside>
              </div>
            </section>

            <section className="px-6 py-6 md:px-10 xl:px-16">
              <motion.div variants={item} className="grid gap-5 lg:grid-cols-3">
                {highlights.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="ui-card-elevated rounded-[1.7rem] bg-card/92 p-6 sm:p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </section>

            <section className="px-6 pb-12 pt-6 md:px-10 xl:px-16">
              <motion.div
                variants={item}
                className="overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/90 shadow-[0_30px_80px_-56px_rgba(20,33,61,0.22)]"
              >
                <div className="grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
                  <div className="border-b border-border/70 px-6 py-8 sm:px-8 xl:border-b-0 xl:border-r">
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                      Handoff map
                    </p>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground">
                      Full-width welcome, clear next move.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
                      This page now acts like a real transition surface. It
                      gives you context, visible status, and direct paths into
                      the product instead of compressing everything into a small
                      centered card.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="btn-brand rounded-full px-8"
                      >
                        <Link href="/welcome">
                          Refresh flow
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 hover:border-primary hover:text-primary"
                      >
                        <Link href="/">Go to homepage</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 px-6 py-8 sm:px-8 lg:grid-cols-3">
                    {nextSteps.map((step, index) => (
                      <div
                        key={step}
                        className="rounded-[1.6rem] border border-border/80 bg-background/72 p-5 shadow-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                          0{index + 1}
                        </div>
                        <p className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                          Step {index + 1}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
