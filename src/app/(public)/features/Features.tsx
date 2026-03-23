"use client";
import React from "react";
import {
  BookCopy,
  BookOpenCheck,
  Search,
  ShieldCheck,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "Smooth discovery flow",
    description:
      "Move from search to book details without friction. Everything feels fast and connected.",
    icon: BookOpenCheck,
  },
  {
    title: "Powerful search",
    description:
      "Find books by title, author, or genre instantly without friction.",
    icon: Search,
  },
  {
    title: "Real-time availability",
    description:
      "Always know what’s available, borrowed, or reserved instantly.",
    icon: BookCopy,
  },
  {
    title: "User workspace",
    description:
      "Favorites, history, and account actions in one unified space.",
    icon: UsersRound,
  },
  {
    title: "Community features",
    description:
      "Reading clubs and shared spaces enhance discovery and engagement.",
    icon: WandSparkles,
  },
  {
    title: "Secure system",
    description:
      "Role-based access and protection built directly into the experience.",
    icon: ShieldCheck,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* 🌈 Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.10),transparent_45%)]" />

      {/* ✨ Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-4 py-1.5 text-xs text-primary shadow-sm">
            ✨ Core Capabilities
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            Everything you need to run a modern library
          </h2>

          <p className="mt-5 text-muted-foreground text-lg">
            Built for discovery, borrowing, and seamless user experience.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 text-center"
              >
                {/* Top Gradient Line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary via-pink-500 to-primary opacity-0 group-hover:opacity-100 transition" />

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-primary/5 blur-2xl" />

                {/* ICON */}
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-pink-500/10 text-primary shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-6 space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
                  <span className="text-primary text-sm">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
