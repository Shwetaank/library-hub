"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  BookOpen,
  ShieldCheck,
  Users,
  HelpCircle,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface HelpArticle {
  title: string;
  categoryId: string;
}

interface HelpCategory {
  id: string;
  title: string;
  icon: LucideIcon;
}

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const HELP_CATEGORIES: HelpCategory[] = [
  { id: "getting-started", title: "Getting Started", icon: BookOpen },
  { id: "borrowing", title: "Borrowing & Returns", icon: Sparkles },
  { id: "account-security", title: "Account & Security", icon: ShieldCheck },
  { id: "community", title: "Community & Reviews", icon: Users },
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

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>(
    HELP_CATEGORIES[0].id,
  );

  /* ---------------------- Filter Articles Globally ---------------------- */

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
    <div className="relative min-h-screen bg-linear-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        {/* ================= HERO ================= */}

        <section className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-pulse">
            <ShieldCheck className="w-4 h-4 mr-2" />
            99.9% Platform Uptime â€¢ 24h Support
          </Badge>

          <h1 className="text-4xl pb-10 sm:text-6xl font-bold bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
            How can we help you today ?
          </h1>

          <p className="text-muted-foreground mx-auto mb-10 text-lg">
            Search across our knowledge base to find guides, tutorials, and
            troubleshooting resources instantly.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-4 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-14 h-14 rounded-2xl text-base shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* ================= LAYOUT ================= */}

        <section className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2 sticky top-28 h-fit">
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                    isActive
                      ? "bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 text-primary-foreground dark:text-black cursor-pointer shadow "
                      : "hover:bg-muted cursor-pointer hover:shadow"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </button>
              );
            })}
          </aside>

          {/* Articles */}
          <div className="lg:col-span-3">
            <Card className="p-10 rounded-3xl backdrop-blur border border-border/60 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center cursor-pointer underline underline-offset-3  gap-6">
                <Star className="w-10 h-10 text-yellow-600 animate-pulse " />
                Articles
              </h2>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={searchQuery + activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {filteredArticles.map((article) => (
                    <li
                      key={article.title}
                      className="group flex justify-between items-center p-5 rounded-2xl border border-border/50 hover:bg-muted/50 hover:shadow-md transition cursor-pointer"
                    >
                      <span className="font-medium">{article.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition" />
                    </li>
                  ))}

                  {filteredArticles.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                      No articles found.
                    </div>
                  )}
                </motion.ul>
              </AnimatePresence>
            </Card>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="mt-28">
          <Card className="text-center p-14 rounded-3xl bg-linear-to-r from-primary/10 to-purple-500/10 border shadow-lg">
            <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
              Still need help?
            </h2>

            <p className="text-muted-foreground mb-8 text-lg">
              Our support team typically responds within 24 hours. Premium
              members receive priority support.
            </p>

            <Button
              size="lg"
              asChild
              className="bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 rounded-xl px-8"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HelpCenterPage;


