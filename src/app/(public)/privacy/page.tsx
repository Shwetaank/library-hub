"use client";

/**
 * Privacy & Terms Page
 * ----------------------------------------------------
 * Displays Privacy Policy and Terms of Service content
 * with animated section cards and tab switching.
 *
 * Features:
 * - Dynamic version (env-based)
 * - Dynamic last updated date
 * - Animated transitions (Framer Motion)
 * - Equal-height responsive cards
 * - Modern gradient typography
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Lock,
  Database,
  FileText,
  Scale,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

/**
 * Application version
 * - Controlled via environment variable
 * - Falls back to default if not provided
 */
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "3.0.0";

/**
 * Returns formatted Month + Year (e.g., February 2026)
 */
const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

/**
 * Centralized legal metadata
 */
const LEGAL_META = {
  version: APP_VERSION,
  lastUpdated: getFormattedDate(),
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type TabType = "privacy" | "terms";

/**
 * Structure of a legal content section
 */
interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string;
}

/* -------------------------------------------------------------------------- */
/*                               Legal Content                                */
/* -------------------------------------------------------------------------- */

/**
 * Single source of truth for all legal content.
 * Keeps UI clean and content manageable.
 */
const LEGAL_CONTENT: Record<TabType, LegalSection[]> = {
  privacy: [
    {
      id: "collection",
      title: "Information We Collect",
      icon: ShieldCheck,
      content:
        "To deliver a secure and seamless digital library experience, we collect essential data including account credentials, borrowing activity, analytics insights, and technical metadata.",
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: Lock,
      content:
        "Your data is used to authenticate access, manage lending workflows, monitor security, and ensure compliance with regulatory requirements.",
    },
    {
      id: "security",
      title: "Data Security & Infrastructure",
      icon: Database,
      content:
        "All information is encrypted in transit and at rest, protected by role-based access controls, and hosted on secure cloud infrastructure.",
    },
    {
      id: "rights",
      title: "Your Rights & Data Governance",
      icon: UserCheck,
      content:
        "You may request access, correction, deletion, or export of your information under applicable data protection laws.",
    },
  ],
  terms: [
    {
      id: "responsibilities",
      title: "Your Responsibilities",
      icon: FileText,
      content:
        "You agree to provide accurate information, protect credentials, and use the platform responsibly.",
    },
    {
      id: "acceptable",
      title: "Acceptable Use Policy",
      icon: AlertTriangle,
      content:
        "System abuse, scraping, unauthorized access attempts, or service disruption are strictly prohibited.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Scale,
      content:
        "The platform is provided 'as-is'. We disclaim liability for indirect or consequential damages.",
    },
    {
      id: "updates",
      title: "Policy Updates & Revisions",
      icon: RefreshCw,
      content:
        "Policies may change over time. Continued use indicates acceptance of updated terms.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                               Animations                                   */
/* -------------------------------------------------------------------------- */

/**
 * Container animation for staggered card entry
 */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/**
 * Individual card animation
 */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*                              Section Card                                  */
/* -------------------------------------------------------------------------- */

/**
 * Reusable animated legal section card.
 * - Fully responsive
 * - Equal height inside grid
 * - Subtle hover interaction
 */
const SectionCard = React.memo(
  ({ title, icon: Icon, content }: LegalSection) => (
    <motion.div variants={cardVariants} className="h-full">
      <Card className="cursor-pointer group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <CardContent className="p-8 space-y-5 flex flex-col h-full">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="w-5 h-5 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold tracking-tight bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent hover:underline hover:underline-offset-2">
              {title}
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base text-justify grow">
            {content}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  ),
);

SectionCard.displayName = "SectionCard";

/* -------------------------------------------------------------------------- */
/*                                Main Page                                   */
/* -------------------------------------------------------------------------- */

const PrivacyTermsPage: React.FC = () => {
  /**
   * Current active tab state
   */
  const [tab, setTab] = useState<TabType>("privacy");

  /**
   * Memoized section list based on selected tab
   */
  const sections = useMemo(() => LEGAL_CONTENT[tab], [tab]);

  return (
    <main className="relative min-h-screen bg-linear-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* ------------------------------------------------------------------ */}
        {/* Hero Section                                                        */}
        {/* ------------------------------------------------------------------ */}

        <section className="text-center max-w-3xl mx-auto space-y-8 mb-20">
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge variant="outline">Version {LEGAL_META.version}</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] pb-1 bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Privacy Policy & Terms
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Last updated{" "}
            <span className="font-semibold text-foreground hover:underline-offset-2 hover:underline cursor-pointer">
              {LEGAL_META.lastUpdated}
            </span>
            . We prioritize transparency, data protection, and responsible
            governance.
          </p>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Tabs Navigation                                                      */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex justify-center mb-16">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as TabType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 shadow-inner">
              <TabsTrigger
                value="privacy"
                className="rounded-full cursor-pointer data-[state=active]:shadow-md transition"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger
                value="terms"
                className="rounded-full cursor-pointer data-[state=active]:shadow-md transition"
              >
                Terms
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Animated Content Grid                                               */}
        {/* ------------------------------------------------------------------ */}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 auto-rows-fr"
          >
            {sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default PrivacyTermsPage;


