"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
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
import { Badge } from "@/components/ui/badge";
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
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const PrivacyTermsPage: React.FC = () => {
  const [tab, setTab] = useState<TabType>("privacy");
  const sections = useMemo(() => LEGAL_CONTENT[tab], [tab]);

  return (
    <main className="page-surface relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.12),transparent_24%)]" />
      <div className="noise-grid pointer-events-none absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="container relative mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
            >
              <Library className="mr-1.5 h-3.5 w-3.5" />
              Privacy and Terms
            </Badge>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="accent-text">
                Transparent legal foundations for a product-grade platform
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              LibraryHub prioritizes transparency, secure data handling, and
              responsible governance. This page outlines how information is used,
              protected, and governed across the platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                Version {LEGAL_META.version}
              </span>
              <span className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                Updated {LEGAL_META.lastUpdated}
              </span>
            </div>
          </div>

          <div className="hero-shell p-5 sm:p-6">
            <div className="grid gap-4">
              <Card className="glass-panel rounded-[1.5rem] p-5">
                <h2 className="text-xl font-semibold tracking-tight">
                  Legal focus areas
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  The policies below are organized around the areas that matter most:
                  data usage, security, acceptable use, and governance updates.
                </p>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="glass-panel rounded-[1.5rem] p-5">
                  <div className="mb-3 inline-flex rounded-full border border-primary/15 bg-primary/10 p-2 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">Privacy</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    How LibraryHub handles information, security, and user rights.
                  </p>
                </Card>

                <Card className="glass-panel rounded-[1.5rem] p-5">
                  <div className="mb-3 inline-flex rounded-full border border-secondary/15 bg-secondary/10 p-2 text-secondary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">Terms</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    The responsibilities, usage boundaries, and platform conditions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-xl">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as TabType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-full border border-primary/10 bg-background/78 p-1 shadow-sm">
                <TabsTrigger
                  value="privacy"
                  className="rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground"
                >
                  Terms of Service
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        <section className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid gap-6 sm:grid-cols-2 auto-rows-fr"
            >
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <motion.div key={section.id} variants={cardVariants} className="h-full">
                    <Card className="glass-panel mesh-card h-full rounded-[1.6rem] p-6">
                      <div className="mb-5 inline-flex rounded-[1rem] border border-primary/15 bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {section.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {section.content}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="mt-16">
          <div className="glass-panel mesh-card relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_28%),linear-gradient(135deg,rgba(79,70,229,0.05),transparent_45%,rgba(245,158,11,0.08))]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Need clarification on a policy?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                If you need help understanding how LibraryHub handles privacy,
                terms, or platform responsibilities, contact the support team directly.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-linear-to-r from-primary to-secondary px-8 text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.55)]"
                >
                  <Link href="/contact">
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PrivacyTermsPage;
