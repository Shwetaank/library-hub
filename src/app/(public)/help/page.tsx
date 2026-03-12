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
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  { title: "Borrowing Limits", categoryId: "borrowing" },
  { title: "Renew a Book", categoryId: "borrowing" },
  { title: "Return a Book", categoryId: "borrowing" },
  { title: "Change Password", categoryId: "account-security" },
  { title: "Enable Two-Factor Authentication", categoryId: "account-security" },
  { title: "Write Reviews", categoryId: "community" },
  { title: "Login Issues", categoryId: "troubleshooting" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
    <div className="page-surface relative overflow-hidden">
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
              Help Center
            </Badge>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="accent-text">
                Help content built around the way LibraryHub actually works
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Search guides, troubleshooting content, and workflow answers across
              the LibraryHub experience. Find the right article faster and move
              back into the product with less friction.
            </p>

            <div className="mt-8 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search help articles..."
                  className="h-14 rounded-full border-primary/10 bg-background/80 pl-14 text-base shadow-sm"
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
            className="hero-shell p-5 sm:p-6"
          >
            <div className="grid gap-4">
              <Card className="glass-panel rounded-[1.5rem] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Support Snapshot</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Platform help flow
                    </div>
                  </div>
                  <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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
                      className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/75 px-4 py-3"
                    >
                      <Star className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-foreground/85">{line}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Categories
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Explore by topic
              </h2>
            </div>

            <div className="space-y-3">
              {HELP_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(category.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-[1.4rem] border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-primary/20 bg-[linear-gradient(135deg,rgba(79,70,229,0.12),rgba(245,158,11,0.08))] shadow-[0_18px_45px_-30px_rgba(79,70,229,0.45)]"
                        : "border-primary/10 bg-background/78 hover:border-secondary/20 hover:bg-background"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">{category.title}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            <Card className="glass-panel mesh-card rounded-[2rem] p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full border border-primary/15 bg-primary/10 p-2 text-primary">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Articles</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {searchQuery
                      ? "Search results across help content."
                      : "Topic-specific guidance based on the selected category."}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery + activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {filteredArticles.map((article) => (
                    <div
                      key={article.title}
                      className="group flex items-center justify-between rounded-[1.4rem] border border-primary/10 bg-background/76 px-5 py-4 transition hover:border-secondary/20 hover:bg-background"
                    >
                      <div className="text-sm font-medium text-foreground/90">
                        {article.title}
                      </div>
                      <ArrowRight className="h-4 w-4 text-secondary transition group-hover:translate-x-0.5" />
                    </div>
                  ))}

                  {filteredArticles.length === 0 ? (
                    <div className="rounded-[1.4rem] border border-primary/10 bg-background/76 px-5 py-10 text-center text-sm text-muted-foreground">
                      No articles found for your current search.
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </section>

        <section className="mt-16">
          <div className="glass-panel mesh-card relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_28%),linear-gradient(135deg,rgba(79,70,229,0.05),transparent_45%,rgba(245,158,11,0.08))]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Still need help?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                If the knowledge base does not cover your issue, contact support
                directly and we will help you move forward.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  asChild
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
    </div>
  );
};

export default HelpCenterPage;
