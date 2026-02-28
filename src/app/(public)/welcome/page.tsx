"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowRight } from "lucide-react";
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

const WelcomePage = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(7);

  /* ================= Auto Redirect Logic ================= */

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        router.push("/");
      }, 800); // match exit animation duration
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="relative items-center justify-center min-h-screen overflow-hidden bg-linear-to-br from-background via-muted/30 to-background">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-30 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      </div>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col items-center justify-center px-6 pt-36 text-center"
          >
            {/* Badge */}
            <motion.div
              variants={item}
              className="mb-6 rounded-full border bg-muted/40 px-4 py-1 text-sm backdrop-blur"
            >
              📚 Smart Digital Library Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="text-8xl font-bold tracking-tight "
            >
              <span className="text-4xl pb-10 sm:text-6xl font-bold bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                Library Hub
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="mt-8 max-w-6xl text-lg leading-relaxed text-muted-foreground"
            >
              Discover, borrow, and manage your favorite books with unparalleled
              ease. Your journey begins now.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-linear-to-r from-primary via-purple-500 to-pink-500 px-10 text-base shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-6" />
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
            {/* Countdown Display */}
            <motion.div
              variants={item}
              className="mt-10 text-sm text-muted-foreground"
            >
              Redirecting to catalog in{" "}
              <span className="font-semibold text-primary">{countdown}</span>{" "}
              seconds...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
