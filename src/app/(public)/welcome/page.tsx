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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const REDIRECT_COUNTDOWN_SECONDS = 7;
const EXIT_ANIMATION_MS = 600;

const WelcomePage = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_COUNTDOWN_SECONDS);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const timer = setTimeout(() => {
      setIsExiting(true);
      exitTimer = setTimeout(() => router.push("/"), EXIT_ANIMATION_MS);
    }, REDIRECT_COUNTDOWN_SECONDS * 1000);

    return () => {
      clearTimeout(timer);
      if (exitTimer) clearTimeout(exitTimer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6"
          >
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur-xl sm:p-8 lg:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                  <div className="text-center lg:text-left">
                    <motion.div
                      variants={item}
                      className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      <Sparkles className="h-4 w-4" />
                      Smart Digital Library Platform
                    </motion.div>

                    <motion.div
                      variants={item}
                      className="mb-6 flex justify-center lg:justify-start"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/15 bg-primary/10 text-primary">
                        <BookOpen className="relative h-7 w-7" />
                      </div>
                    </motion.div>

                    <motion.h1
                      variants={item}
                      className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
                    >
                      Welcome to LibraryHub
                    </motion.h1>

                    <motion.p
                      variants={item}
                      className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
                    >
                      Your library workspace is ready. Discover books, manage circulation, and
                      move into a cleaner operational flow designed for modern readers and
                      library teams.
                    </motion.p>

                    <motion.div
                      variants={item}
                      className="mt-8 flex flex-col gap-4 sm:flex-row lg:justify-start"
                    >
                      <Button asChild size="lg" className="w-full rounded-full bg-primary px-8 text-base text-primary-foreground hover:bg-primary/92 sm:w-auto">
                        <Link href="/">
                          Explore LibraryHub <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="w-full rounded-full bg-card/80 px-8 text-base shadow-sm sm:w-auto">
                        <Link href="/about">View Platform</Link>
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div variants={item} className="flex items-center">
                    <div className="w-full rounded-[1.5rem] border border-border/70 bg-muted/40 p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="text-base font-semibold text-foreground">
                          Session Prepared
                        </div>
                        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Ready
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/70 bg-card p-5 text-center">
                        <div className="text-sm uppercase tracking-widest text-muted-foreground">
                          Redirecting in
                        </div>
                        <div className="my-2 text-6xl font-semibold tracking-tighter text-primary">
                          {countdown}
                        </div>
                        <div
                          className="mx-auto h-1.5 max-w-[100px] rounded-full bg-muted/80"
                        >
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-1000"
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
                            className="flex items-center gap-3 rounded-lg border border-border/70 bg-card/90 px-4 py-3"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm text-foreground/90">{line}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-3 rounded-lg border border-border/70 bg-card/90 px-4 py-3">
                        <Clock3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          You will be redirected automatically.
                        </span>
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
