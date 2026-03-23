"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Library,
  Lock,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabType = "privacy" | "terms";

type LegalSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  points: string[];
};

type LegalOverview = {
  label: string;
  title: string;
  intro: string;
  sideNote: string;
  sections: LegalSection[];
};

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "3.0.0";

const getFormattedDate = (): string =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

const LEGAL_META = {
  version: APP_VERSION,
  lastUpdated: getFormattedDate(),
} as const;

const privacyPromises: {
  title: string;
  description: string;
}[] = [
  {
    title: "Minimal collection",
    description:
      "We only collect the data required to run the platform efficiently.",
  },
  {
    title: "Transparency",
    description: "Clear explanation of how data is used across the system.",
  },
  {
    title: "Security first",
    description:
      "Continuous improvements in infrastructure and protection layers.",
  },
];

const LEGAL_CONTENT: Record<TabType, LegalOverview> = {
  privacy: {
    label: "Privacy Policy",
    title: "How we handle your data responsibly.",
    intro:
      "We collect only what is necessary to operate LibraryHub effectively and securely.",
    sideNote: "Privacy is built into the product, not added later.",
    sections: [
      {
        id: "collection",
        title: "Data Collection",
        icon: ShieldCheck,
        summary: "We collect minimal and necessary information.",
        points: [
          "User account details",
          "Borrowing activity",
          "System performance data",
        ],
      },
      {
        id: "usage",
        title: "Usage",
        icon: Lock,
        summary: "Data is used strictly for product functionality.",
        points: ["Authentication", "Borrow workflows", "Improving UX"],
      },
    ],
  },
  terms: {
    label: "Terms of Service",
    title: "Rules that keep the platform reliable.",
    intro: "These terms define how users interact with LibraryHub responsibly.",
    sideNote: "Clear rules ensure stability and trust.",
    sections: [
      {
        id: "responsibility",
        title: "User Responsibility",
        icon: FileText,
        summary: "Users must act responsibly.",
        points: [
          "Provide accurate info",
          "Avoid misuse",
          "Respect system rules",
        ],
      },
      {
        id: "limitations",
        title: "Limitations",
        icon: Scale,
        summary: "Service comes with reasonable limitations.",
        points: ["No guarantee of uptime", "Liability is limited"],
      },
    ],
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const PrivacyTermsPage: React.FC = () => {
  const [tab, setTab] = useState<TabType>("privacy");

  const activeContent = LEGAL_CONTENT[tab];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <section className="px-6 py-16 md:px-10 xl:px-16">
        <div className="grid items-center gap-12 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
              <Library className="h-4 w-4" />
              Privacy & Governance
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight xl:text-6xl">
              Clear policies for a platform built on trust.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              LibraryHub is designed around responsible data handling and
              transparent governance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="stat-chip">Version {LEGAL_META.version}</span>
              <span className="stat-chip">
                Updated {LEGAL_META.lastUpdated}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border bg-card/70 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              {activeContent.label}
            </p>
            <h3 className="mt-3 text-xl font-semibold">Trust snapshot</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {activeContent.sideNote}
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Role-based secure access",
                "Minimal data collection",
                "Transparent governance",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold">What this page clarifies</h2>

            <p className="mt-4 text-muted-foreground">
              Policy pages should explain how the product behaves in reality.
            </p>

            <div className="mt-8 space-y-5">
              {privacyPromises.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as TabType)}
            >
              <TabsList className="grid max-w-md grid-cols-2 rounded-full p-1">
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="terms">Terms</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-8">
              <h2 className="text-3xl font-semibold">{activeContent.title}</h2>

              <p className="mt-4 text-muted-foreground">
                {activeContent.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 xl:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {activeContent.sections.map((section) => {
              const Icon = section.icon;

              return (
                <motion.div key={section.id} variants={itemVariants}>
                  <Card className="h-full rounded-3xl p-7">
                    <Icon className="h-8 w-8 text-primary" />

                    <h3 className="mt-5 text-xl font-semibold">
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                      {section.summary}
                    </p>

                    <div className="mt-5 space-y-2">
                      {section.points.map((point) => (
                        <p
                          key={point}
                          className="text-sm text-muted-foreground"
                        >
                          &bull; {point}
                        </p>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="px-6 pb-20 md:px-10 xl:px-16">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border bg-card p-10 xl:flex-row">
          <div>
            <h2 className="text-4xl font-semibold">
              Need help understanding something?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Reach out and we&apos;ll clarify everything.
            </p>
          </div>

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/help">Help Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyTermsPage;
