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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[54px_54px] opacity-[0.16]" />
      <div className="absolute left-[-12%] top-12 -z-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute bottom-12 right-[-10%] -z-10 h-80 w-80 rounded-full bg-pink-500/12 blur-3xl" />

      <AnimatePresence>
        {!exit && (
          <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-10"
          >
            <div className="grid w-full gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:gap-10">
              <motion.section variants={item} className="hero-shell">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/82 px-4 py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.24em] text-primary shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Welcome flow ready
                </div>

                <div className="mt-7 max-w-3xl">
                  <h1 className="editorial-title">
                    Welcome to LibraryHub.
                    <span className="block bg-linear-to-r from-primary via-primary to-pink-500 bg-clip-text text-transparent">
                      Your next session is ready.
                    </span>
                  </h1>

                  <p className="editorial-copy mt-6 max-w-2xl">
                    Everything is set for a smoother library experience. You can
                    jump back into discovery, explore the catalog, or let the
                    redirect carry you into the main product flow automatically.
                  </p>
                </div>

                <motion.div
                  variants={item}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {statusItems.map((status) => (
                    <div key={status} className="stat-chip flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{status}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  variants={item}
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
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
                </motion.div>

                <motion.div
                  variants={item}
                  className="mt-12 grid gap-4 md:grid-cols-3"
                >
                  {highlights.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="ui-card-elevated rounded-[1.55rem] p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h2 className="mt-5 text-lg font-semibold tracking-tight">
                        {title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.section>

              <motion.aside
                variants={item}
                className="rail-shell flex flex-col justify-between p-6 sm:p-8"
              >
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
                    <div className="mt-3 flex items-end gap-3">
                      <div className="text-7xl font-semibold leading-none tracking-[-0.08em]">
                        {countdown}
                      </div>
                      <p className="max-w-[9rem] pb-2 text-sm leading-6 text-primary-foreground/72">
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
                    {nextSteps.map((step) => (
                      <div
                        key={step}
                        className="ink-panel flex items-start gap-3 px-4 py-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                        <p className="text-sm leading-7 text-primary-foreground/82">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 rounded-[1.35rem] border border-white/12 bg-white/10 p-5">
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
                      className="h-12 rounded-full border border-white/14 bg-white text-foreground hover:bg-white/92"
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
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
