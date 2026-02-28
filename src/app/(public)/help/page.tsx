"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  BookMarked,
  Users,
  HelpCircle,
  Star,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface HelpCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  articles: string[];
}

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    icon: BookMarked,
    title: "Getting Started",
    description:
      "Set up your account, explore your dashboard, and borrow your first book.",
    articles: [
      "Create an Account",
      "Verify Your Email",
      "Complete Your Profile",
      "Borrow Your First Book",
    ],
  },
  {
    id: "finding-books",
    icon: Search,
    title: "Finding Books",
    description:
      "Discover books using advanced search, filters, and personalized recommendations.",
    articles: [
      "Use Advanced Search",
      "Browse by Category",
      "Filter by Author or Genre",
      "View Personalized Recommendations",
    ],
  },
  {
    id: "community",
    icon: Users,
    title: "Community & Reviews",
    description:
      "Connect with readers, write reviews, and manage your favorites.",
    articles: [
      "Write and Edit Reviews",
      "Manage Favorite Books",
      "Follow Other Readers",
      "Share Reading Lists",
    ],
  },
  {
    id: "borrowing",
    icon: BookOpen,
    title: "Borrowing & Returns",
    description:
      "Understand borrowing limits, renewal policies, and return workflows.",
    articles: [
      "Borrowing Limits",
      "Renew a Book",
      "Return a Borrowed Book",
      "Track Borrow History",
    ],
  },
  {
    id: "account-security",
    icon: ShieldCheck,
    title: "Account & Security",
    description:
      "Manage account settings, password changes, and privacy preferences.",
    articles: [
      "Change Password",
      "Enable Two-Factor Authentication",
      "Update Email Address",
      "Manage Privacy Settings",
    ],
  },
  {
    id: "troubleshooting",
    icon: HelpCircle,
    title: "Troubleshooting",
    description:
      "Resolve login issues, borrowing errors, and technical platform problems.",
    articles: [
      "Login Issues",
      "Borrowing Errors",
      "Payment or Subscription Problems",
      "Contact Technical Support",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              Animation Config                              */
/* -------------------------------------------------------------------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return helpCategories.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.articles.some((article) =>
          article.toLowerCase().includes(query),
        ),
    );
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen bg-linear-to-b from-background to-muted/30 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-150 h-150 bg-primary/10 blur-3xl rounded-full -mt-40" />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* ================= HERO ================= */}

        <header className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse">
            <ShieldCheck className="w-6 h-6 mr-2" />
            Trusted by 10,000+ Readers
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-\[1.2] pb-1 bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            How Can We Help?
          </h1>

          <p className="text-lg text-muted-foreground mx-auto mb-8 text-justify">
            Access comprehensive guides, tutorials, and resources to help you
            navigate our products and services efficiently. Whether you&apos;re
            a beginner or an advanced user, our documentation is designed to
            provide clear, step-by-step instructions for all your needs.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search
              className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
              aria-hidden
            />
            <Input
              aria-label="Search help articles"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
        </header>

        {/* ================= CATEGORIES ================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredCategories.map((category) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group cursor-pointer p-8 rounded-2xl border border-border/50 bg-background/70 backdrop-blur hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2  bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      {category.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 text-justify">
                      {category.description}
                    </p>

                    <ul className="space-y-2">
                      {category.articles.map((article) => (
                        <li
                          key={article}
                          className="text-sm text-primary underline cursor-pointer font-semibold"
                        >
                          {article}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ================= POPULAR ================= */}

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Popular Guides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 rounded-xl hover:shadow-lg transition">
              Managing your reading goals efficiently
            </Card>
            <Card className="p-6 rounded-xl hover:shadow-lg transition">
              Understanding borrowing limits & renewals
            </Card>
          </div>
        </section>
        {/* ================= CTA ================= */}

        <section>
          <Card className="text-center p-12 rounded-2xl bg-linear-to-r from-primary/10 to-accent/10 border border-border/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-4  bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Still need help?
            </h2>

            <p className="text-muted-foreground mb-6 text-justify">
              Our support team responds within 24 hours. Premium members get
              priority support.
            </p>

            <Button
              size="lg"
              asChild
              className="bg-linear-to-r from-primary to-indigo-500"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </Card>
        </section>
      </section>
    </div>
  );
};

export default HelpCenterPage;
