"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LibraryBig } from "lucide-react";
import { motion, type Variants } from "framer-motion";

/* ✅ Animation Variants (FIXED TYPES) */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIXED
    },
  },
};

const CTASection: React.FC = () => {
  return (
    <section className="relative w-full py-28 lg:py-36 overflow-hidden">
      {/* 🌈 Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.08),transparent_45%)]" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* MAIN CARD */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full rounded-3xl border border-border/60 bg-card/70 backdrop-blur p-8 sm:p-12 lg:p-16"
        >
          {/* Glow */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-2xl opacity-40" />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6 max-w-xl">
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-4 py-1.5 text-xs text-primary"
              >
                <LibraryBig className="h-4 w-4" />
                Get Started
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
              >
                Build your modern library
                <span className="block text-primary">
                  in minutes, not hours
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg text-justify"
              >
                Discover books, manage collections, and streamline your reading
                experience with a system designed for real users. Everything is
                built to be fast, intuitive, and reliable from day one.
              </motion.p>
            </div>

            {/* RIGHT CTA PANEL */}
            <motion.div
              variants={fadeUp}
              className="relative w-full rounded-2xl border border-border/60 bg-background/80 backdrop-blur p-6 sm:p-8 shadow-sm"
            >
              {/* Panel Glow */}
              <div className="absolute inset-0 -z-10 bg-primary/5 blur-xl rounded-2xl opacity-40" />

              <div className="flex flex-col gap-4">
                {/* PRIMARY BUTTON */}
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button className="w-full cursor-pointer rounded-xl h-12 text-base font-semibold shadow-md transition">
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>

                {/* SECONDARY BUTTON */}
                <Link href="/catalog">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer rounded-xl h-12 text-base hover:text-primary hover:border-primary transition"
                    >
                      Browse catalog
                    </Button>
                  </motion.div>
                </Link>

                {/* Helper Text (NO conflict now) */}
                <motion.p
                  variants={fadeUp}
                  className="text-xs text-muted-foreground text-justify pt-2"
                >
                  No credit card required. Start exploring instantly and
                  experience a seamless, modern library system built for real
                  usage.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
