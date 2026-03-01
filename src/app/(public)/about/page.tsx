"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Zap, Award, LucideIcon } from "lucide-react";
import { useLiveCounter } from "@/hooks/useLiveCounter";
import LiveCounter from "@/components/LiveCounter/LiveCounter";
import Link from "next/link";

/* ================= Animation Variants ================= */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const AboutPage: React.FC = () => {
  /* ================= Live Metrics ================= */

  const readers = useLiveCounter(5000, 4950, 5100);
  const books = useLiveCounter(1000, 995, 1010);
  const transactions = useLiveCounter(500, 480, 520);

  /* ================= Core Values Cards ================= */

  const values: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[] = [
    {
      icon: BookOpen,
      title: "Smart Book Discovery",
      description:
        "Easily browse, search, and filter through a growing catalog of books with real-time availability updates.",
    },
    {
      icon: Users,
      title: "Personalized Dashboard",
      description:
        "Track borrowed books, manage returns, monitor your activity, and stay organized with a user-friendly dashboard.",
    },
    {
      icon: Zap,
      title: "Real-Time Availability",
      description:
        "Instantly check book availability and transaction status without delays or manual follow-ups.",
    },
    {
      icon: Award,
      title: "Secure & Reliable",
      description:
        "Role-based access, protected authentication, and secure data management ensure a trusted experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/20 to-background">
      <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-20">
        {/* ================= HERO ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-20"
        >
          <h1 className="text-4xl pb-10 sm:text-6xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            About LibraryHub
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-foreground/80 mx-auto leading-relaxed text-justify">
            LibraryHub is a modern Library Management System designed to help
            users explore books, check availability in real time, borrow titles,
            and manage their reading journey through a simple and intuitive
            digital platform.
          </p>
        </motion.div>

        {/* ================= MISSION ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl border bg-background/70 backdrop-blur-md p-8 sm:p-14 mb-24 shadow-sm"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-center bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent  mb-6">
            Our Mission
          </h2>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mx-auto text-justify ">
            Our mission is to simplify the way readers interact with libraries
            by providing a seamless digital experience. From discovering new
            books to tracking borrowed titles and managing personal accounts,
            LibraryHub brings convenience, transparency, and efficiency to
            everyday library operations.
          </p>
        </motion.div>

        {/* ================= LIVE BADGE ================= */}
        <div className="flex justify-center mb-12">
          <Badge
            variant="destructive"
            className="px-5 py-1.5 text-sm font-medium flex items-center gap-2 relative"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-[pulse_2.5s_ease-in-out_infinite] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            LIVE PLATFORM METRICS
          </Badge>
        </div>

        {/* ================= LIVE STATS ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center mb-28"
        >
          {[
            { data: readers, label: "Active Readers" },
            { data: books, label: "Available Titles" },
            { data: transactions, label: "Daily Transactions" },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeUp}>
              <LiveCounter value={stat.data.count} />

              <div
                className={`mt-2 text-sm font-semibold ${
                  stat.data.direction === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.data.direction === "up" ? "+" : ""}
                {stat.data.percentage}%{" "}
                {stat.data.direction === "up" ? "↑" : "↓"}
              </div>

              <p className="mt-3 text-lg text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= VALUES ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-28"
        >
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div key={index} variants={fadeUp} className="h-full">
                <Card className="h-full flex flex-col p-8 rounded-2xl border cursor-pointer bg-background/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    <Icon className="h-10 w-10 animate-pulse " />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-center">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= CTA ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl border bg-linear-to-r from-primary/10 to-indigo-500/10 p-10 sm:p-16 text-center backdrop-blur-md"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Start Exploring Today
          </h2>

          <p className="text-lg text-foreground/80 mx-auto mb-10 text-justify">
            Discover books, check availability, and manage your library account
            with ease. Everything you need for a seamless reading experience is
            just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-10 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-primary to-purple-500 hover:opacity-90"
            >
              <Link href="/books">Explore Books</Link>
            </Button>

            <div className="w-full sm:w-auto">
              <div className="w-full sm:w-auto rounded-xl bg-linear-to-r from-primary to-purple-500 p-0.5">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto rounded-[10px] bg-background text-foreground border-0 hover:bg-background/90"
                >
                  <Link href="/dashboard" className="w-full text-center">
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
