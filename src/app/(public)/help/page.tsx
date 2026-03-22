"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Library,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HelpArticle {
  title: string;
  categoryId: string;
}

interface HelpCategory {
  id: string;
  title: string;
  icon: LucideIcon;
}

const HELP_CATEGORIES: HelpCategory[] = [
  { id: "getting-started", title: "Getting Started", icon: BookOpen },
  { id: "borrowing", title: "Borrowing and Returns", icon: Sparkles },
  { id: "account-security", title: "Account and Security", icon: ShieldCheck },
  { id: "community", title: "Community and Reviews", icon: Users },
  { id: "troubleshooting", title: "Troubleshooting", icon: HelpCircle },
];

const HELP_ARTICLES: HelpArticle[] = [
  { title: "Create an Account", categoryId: "getting-started" },
  { title: "Verify Email", categoryId: "getting-started" },
  { title: "Complete your reader profile", categoryId: "getting-started" },
  { title: "Borrowing Limits", categoryId: "borrowing" },
  { title: "Renew a Book", categoryId: "borrowing" },
  { title: "Return a Book", categoryId: "borrowing" },
  { title: "Waitlist notifications", categoryId: "borrowing" },
  { title: "Change Password", categoryId: "account-security" },
  { title: "Enable Two-Factor Authentication", categoryId: "account-security" },
  { title: "Update your notification preferences", categoryId: "account-security" },
  { title: "Write Reviews", categoryId: "community" },
  { title: "Join a reading club", categoryId: "community" },
  { title: "Login Issues", categoryId: "troubleshooting" },
  { title: "Problems with book rendering", categoryId: "troubleshooting" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(HELP_CATEGORIES[0].id);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) {
      return HELP_ARTICLES.filter(
        (article) => article.categoryId === activeCategory,
      );
    }

    return HELP_ARTICLES.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, activeCategory]);

  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Library className="h-4 w-4" />
                  Help Center
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Support content for the way LibraryHub actually works.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  Search guides, troubleshooting content, and workflow answers across the
                  LibraryHub experience. Find the right article faster and move back into the
                  product with less friction.
                </p>
                <div className="mt-8 max-w-xl">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search help articles..."
                      className="h-14 w-full rounded-full border-2 border-border/80 bg-card/90 px-14 text-base shadow-sm outline-none transition-all focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="rounded-[1.7rem] border border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-base font-semibold">Support Snapshot</div>
                  <div className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                    Knowledge Base
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Search common platform workflows",
                    "Move through categories without confusion",
                    "Escalate to support when needed",
                  ].map((line) => (
                    <div
                      key={line}
                      className="flex items-center gap-3 rounded-lg border bg-background/70 px-4 py-3"
                    >
                      <Sparkles className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground/85">{line}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px] grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Explore by topic</h2>
            <div className="space-y-3">
              {HELP_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id && !searchQuery;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(category.id);
                    }}
                    className={`flex w-full items-center gap-4 rounded-[1.2rem] border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-primary/30 bg-primary/5 shadow-md"
                        : "border-border/70 bg-card/80 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-base font-medium">{category.title}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            <Card className="rounded-[1.8rem] border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em]">Articles</h2>
                  <p className="mt-1 text-base text-muted-foreground">
                    {searchQuery
                      ? "Search results across help content."
                      : "Topic-specific guidance for the selected category."}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery + activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {filteredArticles.map((article) => (
                    <Link
                      key={article.title}
                      href="#"
                      className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/70 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="text-base font-medium text-foreground/90">
                        {article.title}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  ))}
                  {filteredArticles.length === 0 ? (
                    <div className="rounded-xl border border-border/70 bg-background/70 px-5 py-14 text-center text-base text-muted-foreground">
                      No articles found for your current search.
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-[2.25rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_24%),color-mix(in_oklch,var(--color-card)_92%,transparent)] px-8 py-10 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                  Still need help?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-9 text-muted-foreground">
                  If the knowledge base does not cover your issue, contact support directly and
                  we will help you move forward.
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

export default HelpCenterPage;
