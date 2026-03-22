"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, UsersRound, BookCopy, ScanSearch } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-screen flex items-center overflow-hidden">
      {/* 🌈 Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_45%)]" />

      {/* ✨ Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[48px_48px]" />

      {/* Container */}
      <div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <ScanSearch size={14} />
              Smart Library Platform
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Build your library
              <span className="block bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                faster, smarter, simpler
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Discover, borrow, and manage books effortlessly with a modern
              system built for real users.
            </p>

            {/* Stats */}
            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-xl font-semibold">10k+</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <UsersRound size={14} /> Users
                </p>
              </div>

              <div>
                <p className="text-xl font-semibold">50k+</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <BookCopy size={14} /> Books
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/register">
                <Button className="rounded-xl px-6 py-5 text-base shadow-lg hover:scale-[1.04] transition">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/catalog">
                <Button
                  variant="ghost"
                  className="rounded-xl px-6 py-5 text-base hover:bg-muted"
                >
                  Browse catalog →
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow */}
            <div className="absolute -inset-10 -z-10 bg-primary/10 blur-3xl rounded-full" />

            {/* Image */}
            <div className="rounded-2xl border bg-card/80 backdrop-blur p-2 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/features/UnifiedSearch.png"
                alt="Library UI"
                width={1200}
                height={700}
                className="rounded-xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-8 -left-8 hidden md:block rounded-xl border bg-background/80 backdrop-blur p-4 shadow-xl">
              <p className="text-sm font-semibold">Fast Search</p>
              <p className="text-xs text-muted-foreground">Instant results</p>
            </div>

            <div className="absolute -top-8 -right-8 hidden md:block rounded-xl border bg-background/80 backdrop-blur p-4 shadow-xl">
              <p className="text-sm font-semibold">Live Availability</p>
              <p className="text-xs text-muted-foreground">Real-time updates</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
