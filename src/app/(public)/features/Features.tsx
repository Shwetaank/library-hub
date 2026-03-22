"use client";
import React from "react";
import { BookCopy, BookOpenCheck, Search, ShieldCheck, UsersRound, WandSparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const features = [
  {
    title: "Discovery that keeps momentum",
    description:
      "Move from search to detail to availability in a way that feels structured, fast, and editorially clear.",
    icon: BookOpenCheck,
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Search tuned for real library browsing",
    description:
      "Readers can explore by title, author, genre, and keyword without fighting the interface.",
    icon: Search,
    accent: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  },
  {
    title: "Borrowing-aware catalog state",
    description:
      "Availability, loan actions, and book status stay visible so readers and staff can make decisions faster.",
    icon: BookCopy,
    accent: "bg-amber-500/14 text-amber-600 dark:text-amber-300",
  },
  {
    title: "Member workspace with continuity",
    description:
      "Favorites, history, and account actions feel connected instead of scattered across separate flows.",
    icon: UsersRound,
    accent: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
  },
  {
    title: "Clubs and community layers",
    description:
      "Reading groups add discovery and shared context without pulling the product away from its library core.",
    icon: WandSparkles,
    accent: "bg-rose-500/12 text-rose-600 dark:text-rose-300",
  },
  {
    title: "Trust built into the interface",
    description:
      "Account protection, role-aware actions, and calmer UI language make the system easier to trust.",
    icon: ShieldCheck,
    accent: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
  },
];

const FeaturesSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="section-kicker">Core Capabilities</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title mt-6"
          >
            Everything you need for a seamless library experience.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-copy mt-5 !text-lg"
          >
            A comprehensive set of features designed to enhance discovery, streamline borrowing, and foster a vibrant reading community.
          </motion.p>
        </div>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="ui-card-elevated rounded-[1.8rem] p-7"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] ${feature.accent}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Product detail
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
