"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowRight, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.8 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const REDIRECT_COUNTDOWN_SECONDS = 7;
const EXIT_ANIMATION_MS = 800;

const WelcomePage = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_COUNTDOWN_SECONDS);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setIsExiting(true);
      exitTimer = setTimeout(() => {
        router.push("/");
      }, EXIT_ANIMATION_MS);
    }, REDIRECT_COUNTDOWN_SECONDS * 1000);

    return () => {
      clearTimeout(timer);
      if (exitTimer) clearTimeout(exitTimer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="page-surface relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.16),transparent_24%)]" />
        <div className="noise-grid absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="container mx-auto flex min-h-screen items-center justify-center px-6 py-24"
          >
            <div className="relative w-full max-w-5xl">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(79,70,229,0.08),transparent_45%,rgba(245,158,11,0.08))]" />
              <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-primary/10 p-6 shadow-[0_32px_90px_-48px_rgba(79,70,229,0.45)] sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                  <div className="text-center lg:text-left">
                    <motion.div
                      variants={item}
                      className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
                    >
                      <Sparkles className="h-4 w-4" />
                      Smart Digital Library Platform
                    </motion.div>

                    <motion.div variants={item} className="mb-6 flex justify-center lg:justify-start">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-primary/20 bg-linear-to-br from-primary/18 via-primary/10 to-secondary/20 text-primary">
                        <div className="absolute inset-1 rounded-[1rem] bg-background/75" />
                        <BookOpen className="relative h-7 w-7" />
                      </div>
                    </motion.div>

                    <motion.h1
                      variants={item}
                      className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                    >
                      <span className="accent-text">Welcome to LibraryHub</span>
                    </motion.h1>

                    <motion.p
                      variants={item}
                      className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
                    >
                      Your library workspace is ready. Discover books, manage circulation,
                      and move into a cleaner operational flow designed for modern readers
                      and library teams.
                    </motion.p>

                    <motion.div
                      variants={item}
                      className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start"
                    >
                      <Link href="/">
                        <Button
                          size="lg"
                          className="w-full rounded-full bg-linear-to-r from-primary to-secondary px-8 text-base text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.55)] sm:w-auto"
                        >
                          <BookOpen className="mr-2 h-5 w-5" />
                          Explore LibraryHub
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>

                      <Link href="/about">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full rounded-full border-primary/10 bg-background/80 px-8 sm:w-auto"
                        >
                          View Platform
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      variants={item}
                      className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
                    >
                      {[
                        "Catalog clarity",
                        "Staff-friendly workflows",
                        "Reader-first experience",
                      ].map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
                        >
                          {label}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div variants={item} className="flex items-center">
                    <div className="w-full rounded-[1.8rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(79,70,229,0.08),rgba(255,255,255,0.9),rgba(245,158,11,0.06))] p-5 shadow-sm dark:bg-[linear-gradient(180deg,rgba(129,140,248,0.12),rgba(15,23,42,0.94),rgba(245,158,11,0.06))]">
                      <div className="rounded-[1.5rem] border border-primary/10 bg-background/80 p-5">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              Session prepared
                            </div>
                            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                              Redirect status
                            </div>
                          </div>
                          <div className="rounded-full border border-emerald-500/15 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-600">
                            Ready
                          </div>
                        </div>

                        <div className="rounded-[1.4rem] border border-primary/10 bg-background/85 p-5 text-center">
                          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            Redirecting in
                          </div>
                          <div className="mt-3 text-6xl font-semibold tracking-tight text-primary">
                            {countdown}
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            seconds until you enter the main experience
                          </div>

                          <div className="mt-5 h-2 rounded-full bg-muted/80">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-all duration-1000"
                              style={{
                                width: `${(countdown / REDIRECT_COUNTDOWN_SECONDS) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          {[
                            "Library environment initialized",
                            "Feature surfaces loaded",
                            "Navigation handoff in progress",
                          ].map((line) => (
                            <div
                              key={line}
                              className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/72 px-4 py-3"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="text-sm text-foreground/85">{line}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/72 px-4 py-3">
                          <Clock3 className="h-4 w-4 text-secondary" />
                          <span className="text-sm text-muted-foreground">
                            You will be redirected automatically, or you can continue now.
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
