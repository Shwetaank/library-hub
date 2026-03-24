"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileText,
  Scale,
  Library,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* ---------------- DATA ---------------- */

type Tab = "privacy" | "terms";

const content = {
  privacy: {
    title: "Your data, handled responsibly.",
    intro:
      "We collect only what is necessary and protect it with strong security practices.",
    sections: [
      {
        icon: ShieldCheck,
        title: "Data Collection",
        points: [
          "Minimal required information",
          "Account & activity data",
          "No unnecessary tracking",
        ],
      },
      {
        icon: Lock,
        title: "Usage",
        points: [
          "Authentication & access",
          "Borrowing workflows",
          "Product improvements",
        ],
      },
    ],
  },
  terms: {
    title: "Clear rules for a reliable platform.",
    intro:
      "These terms define fair usage and ensure a safe experience for everyone.",
    sections: [
      {
        icon: FileText,
        title: "User Responsibility",
        points: [
          "Provide accurate information",
          "Respect platform usage",
          "Avoid misuse",
        ],
      },
      {
        icon: Scale,
        title: "Limitations",
        points: [
          "Service availability may vary",
          "Reasonable liability limits",
        ],
      },
    ],
  },
};

const PrivacyPage = () => {
  const [tab, setTab] = useState<Tab>("privacy");

  const active = content[tab];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-125 w-125 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="px-6 py-20 md:px-10 xl:px-16">
        {/* HERO */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Library className="h-4 w-4" />
            Privacy & Terms
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-tight">
            Built on trust and
            <span className="block bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              transparent policies
            </span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-2xl">
            Our policies are designed to clearly explain how LibraryHub works,
            how data is handled, and how users interact with the platform.
          </p>
        </div>

        {/* TRUST BAR */}
        <div className="mt-10 flex flex-wrap gap-3">
          <span className="stat-chip">Version 3.0.0</span>
          <span className="stat-chip">Updated 2026</span>
          <span className="stat-chip">Secure infrastructure</span>
        </div>

        {/* TAB SWITCH */}
        <div className="mt-12 flex gap-4">
          <button
            onClick={() => setTab("privacy")}
            className={`px-6 py-2 rounded-full ${
              tab === "privacy"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Privacy
          </button>

          <button
            onClick={() => setTab("terms")}
            className={`px-6 py-2 rounded-full ${
              tab === "terms"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Terms
          </button>
        </div>

        {/* MAIN CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <div>
              <h2 className="text-3xl font-semibold">{active.title}</h2>
              <p className="mt-4 text-muted-foreground max-w-lg">
                {active.intro}
              </p>
            </div>

            <div className="space-y-6">
              {active.sections.map((sec, i) => {
                const Icon = sec.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border bg-card/60 backdrop-blur p-6"
                  >
                    <Icon className="h-6 w-6 text-primary" />

                    <h3 className="mt-4 text-xl font-semibold">{sec.title}</h3>

                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {sec.points.map((p) => (
                        <li key={p}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* PRINCIPLES */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            "Minimal data collection",
            "Transparent usage",
            "Secure infrastructure",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-card/60 backdrop-blur p-6 text-center"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border bg-card p-10 flex flex-col xl:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold">Still have questions?</h2>
            <p className="text-muted-foreground mt-2">
              We’re here to clarify everything.
            </p>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/contact">
                Contact <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/help">Help Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
