"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  Database,
  FileText,
  Library,
  Lock,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "3.0.0";

const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

const LEGAL_META = {
  version: APP_VERSION,
  lastUpdated: getFormattedDate(),
} as const;

type TabType = "privacy" | "terms";

interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string;
}

const LEGAL_CONTENT: Record<TabType, LegalSection[]> = {
  privacy: [
    {
      id: "collection",
      title: "Information We Collect",
      icon: ShieldCheck,
      content:
        "We collect the operational and account data required to run a secure library experience, including authentication details, borrowing activity, analytics signals, and technical metadata.",
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: Lock,
      content:
        "Your information is used to authenticate access, power lending workflows, improve product reliability, and support operational transparency across the platform.",
    },
    {
      id: "security",
      title: "Data Security and Infrastructure",
      icon: Database,
      content:
        "LibraryHub uses role-based access controls, secure storage, and encrypted data handling to protect user and operational information.",
    },
    {
      id: "rights",
      title: "Your Rights and Governance",
      icon: UserCheck,
      content:
        "You may request access, correction, deletion, or export of your information in line with applicable legal and regulatory requirements.",
    },
  ],
  terms: [
    {
      id: "responsibilities",
      title: "Your Responsibilities",
      icon: FileText,
      content:
        "You agree to provide accurate information, protect account credentials, and use the platform responsibly and lawfully.",
    },
    {
      id: "acceptable",
      title: "Acceptable Use Policy",
      icon: AlertTriangle,
      content:
        "Unauthorized access attempts, scraping, abuse, or disruption of the service are not allowed and may result in restricted access.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Scale,
      content:
        "LibraryHub is provided as-is, and liability is limited to the maximum extent permitted by law for indirect or consequential damages.",
    },
    {
      id: "updates",
      title: "Policy Updates and Revisions",
      icon: RefreshCw,
      content:
        "Policies may be revised over time. Continued use of the platform indicates acceptance of updated legal terms.",
    },
  ],
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const PrivacyTermsPage: React.FC = () => {
  const [tab, setTab] = useState<TabType>("privacy");
  const sections = useMemo(() => LEGAL_CONTENT[tab], [tab]);

  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Library className="h-4 w-4" />
                  Privacy and Terms
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Transparent legal foundations for a modern library platform.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  LibraryHub prioritizes transparency, secure data handling, and responsible
                  governance. This page outlines how information is used, protected, and
                  governed across the platform.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border bg-card/90 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                    Version {LEGAL_META.version}
                  </span>
                  <span className="rounded-full border bg-card/90 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                    Updated {LEGAL_META.lastUpdated}
                  </span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="ui-card-elevated rounded-[1.7rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="text-xl font-semibold">Privacy</div>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    How LibraryHub handles information, security, and user rights.
                  </p>
                </Card>
                <Card className="ui-card-elevated rounded-[1.7rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-xl font-semibold">Terms</div>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    The responsibilities, usage boundaries, and platform conditions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-2xl">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as TabType)}
              className="w-full"
            >
              <TabsList className="grid h-14 w-full grid-cols-2 rounded-full border-2 border-border/80 bg-card/90 p-1 shadow-sm">
                <TabsTrigger
                  value="privacy"
                  className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Terms of Service
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="grid auto-rows-fr gap-6 sm:grid-cols-2"
              >
                {sections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <motion.div
                      key={section.id}
                      variants={cardVariants}
                      className="h-full"
                    >
                      <Card className="h-full rounded-[1.8rem] border border-border/70 bg-card/80 p-6 shadow-sm">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                          {section.title}
                        </h3>
                        <p className="mt-4 text-base leading-8 text-muted-foreground">
                          {section.content}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-[2.25rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_24%),color-mix(in_oklch,var(--color-card)_92%,transparent)] px-8 py-10 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                  Need clarification on a policy?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-9 text-muted-foreground">
                  If you need help understanding how LibraryHub handles privacy, terms, or
                  platform responsibilities, contact the support team directly.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-self-end">
                <Button asChild size="lg" className="rounded-2xl bg-primary px-7 text-primary-foreground hover:bg-primary/92">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyTermsPage;
