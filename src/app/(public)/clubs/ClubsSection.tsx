"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_CLUBS } from "./data";
import { Users, BookOpen } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
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

const ClubsSection: React.FC = () => {
  return (
    <section className="relative w-full py-28 lg:py-36 overflow-hidden">
      {/* 🌈 Background (match hero) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.10),transparent_45%)]" />

      {/* ✨ Grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-4 py-1.5 text-xs text-primary shadow-sm">
            📚 Community
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            Join our vibrant{" "}
            <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              reading clubs
            </span>
          </h2>

          <p className="mt-5 text-muted-foreground text-lg">
            Connect with readers, explore new genres, and grow together.
          </p>
        </div>

        {/* GRID */}
        <motion.div
          className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {MOCK_CLUBS.slice(0, 3).map((club) => (
            <motion.div
              key={club.id}
              variants={itemVariants}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Category */}
                <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  {club.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  {club.name}
                </h3>

                <p className="text-sm text-muted-foreground text-justify">
                  {club.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {club.members} members
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen size={14} />
                    {club.currentBook.title}
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full rounded-xl mt-2">View Club</Button>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-primary/5 blur-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link href="/clubs">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-8 py-5 hover:text-primary hover:border-primary"
            >
              Explore all clubs →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;
