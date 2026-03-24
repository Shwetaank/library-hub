"use client";

import React, { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  LifeBuoy,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import LiveCounter from "@/components/LiveCounter/LiveCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------- ANIMATION ---------------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ---------------- TYPES ---------------- */

type HelpCategory =
  | "all"
  | "getting-started"
  | "catalog"
  | "circulation"
  | "accounts";

interface HelpTopic {
  id: Exclude<HelpCategory, "all">;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface FaqItem {
  id: string;
  category: Exclude<HelpCategory, "all">;
  question: string;
  answer: string;
}

/* ---------------- DATA ---------------- */

const topics: HelpTopic[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    description: "Set up your space, understand the dashboard, and onboard fast.",
    icon: Sparkles,
  },
  {
    id: "catalog",
    label: "Catalog & Discovery",
    description: "Organize books, improve metadata, and keep browsing clean.",
    icon: BookOpen,
  },
  {
    id: "circulation",
    label: "Borrowing & Returns",
    description: "Handle checkouts, due dates, stock movement, and circulation flow.",
    icon: LifeBuoy,
  },
  {
    id: "accounts",
    label: "Accounts & Access",
    description: "Manage staff permissions, reader access, and profile settings.",
    icon: Users,
  },
];

const faqs: FaqItem[] = [
  {
    id: "gs-1",
    category: "getting-started",
    question: "How do I start using LibraryHub for a new library?",
    answer:
      "Begin by creating your admin account, adding your first catalog records, and inviting staff members with the right access levels. Once your basic collection and team are in place, you can start circulation and member onboarding from the same workspace.",
  },
  {
    id: "gs-2",
    category: "getting-started",
    question: "What should I configure first after signing in?",
    answer:
      "Set your library profile, review your core workflows, and confirm how your staff will manage catalog updates, borrowing, and reader records. Doing this first keeps your setup structured and prevents cleanup later.",
  },
  {
    id: "catalog-1",
    category: "catalog",
    question: "Can I organize books by author, category, and availability?",
    answer:
      "Yes. LibraryHub is designed to help you structure titles with metadata such as author, genre, and availability status so readers can browse more confidently and staff can manage records with less friction.",
  },
  {
    id: "catalog-2",
    category: "catalog",
    question: "How do I keep the catalog experience clear for readers?",
    answer:
      "Use consistent titles, complete metadata, and clean descriptions. A stronger catalog structure improves search, discovery, and trust for readers who rely on the collection to feel current and accurate.",
  },
  {
    id: "circulation-1",
    category: "circulation",
    question: "How does LibraryHub support borrowing and returns?",
    answer:
      "Borrowing and return activity is designed to stay connected to your catalog state so availability updates feel immediate. This makes circulation easier to track and reduces the need for manual checking across separate tools.",
  },
  {
    id: "circulation-2",
    category: "circulation",
    question: "Can staff quickly understand overdue and active loans?",
    answer:
      "Yes. The workflow is built to surface active borrowing activity clearly so teams can monitor ongoing loans, follow up where needed, and maintain cleaner circulation oversight.",
  },
  {
    id: "accounts-1",
    category: "accounts",
    question: "How are staff and reader permissions handled?",
    answer:
      "LibraryHub uses role-based access patterns so the right people see the right controls. This helps protect sensitive actions while keeping everyday tasks simple for staff and readers.",
  },
  {
    id: "accounts-2",
    category: "accounts",
    question: "What if a team member needs a different level of access?",
    answer:
      "You can adjust permissions based on responsibilities so circulation-heavy roles, catalog managers, and administrators each work with the level of control that matches their job.",
  },
];

const categories: { value: HelpCategory; label: string }[] = [
  { value: "all", label: "All topics" },
  { value: "getting-started", label: "Getting Started" },
  { value: "catalog", label: "Catalog" },
  { value: "circulation", label: "Circulation" },
  { value: "accounts", label: "Accounts" },
];

const supportLinks = [
  {
    title: "Contact the team",
    description: "Reach out when you want a guided walkthrough or product help.",
    href: "/contact",
  },
  {
    title: "Explore the catalog",
    description: "See how discovery and browsing feel from the reader side.",
    href: "/catalog",
  },
  {
    title: "Learn the product story",
    description: "Review the design principles behind LibraryHub.",
    href: "/about",
  },
] as const;

/* ---------------- COMPONENT ---------------- */

const HelpPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<HelpCategory>("all");
  const [openItem, setOpenItem] = useState<string>("gs-1");

  const deferredQuery = useDeferredValue(query);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, deferredQuery]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[64px_64px]" />
      <div className="absolute left-1/2 top-16 -z-20 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/18 blur-[130px]" />
      <div className="absolute right-0 top-1/3 -z-20 h-80 w-80 rounded-full bg-sky-400/10 blur-[120px]" />

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-20 md:px-10 xl:px-16"
      >
        <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <motion.div variants={item} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm text-primary shadow-sm backdrop-blur">
              <LifeBuoy className="h-4 w-4" />
              Help Center
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight xl:text-6xl">
              Answers built for{" "}
              <span className="bg-linear-to-r from-primary via-sky-500 to-purple-500 bg-clip-text text-transparent">
                real library workflows
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Find the fastest path through setup, catalog management,
              circulation, and account access with a help experience designed to
              feel as calm as the product itself.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border bg-card/70 p-5 backdrop-blur">
                <div className="text-4xl font-semibold">
                  <LiveCounter value={18} suffix="+" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  support answers ready to browse
                </p>
              </div>
              <div className="rounded-2xl border bg-card/70 p-5 backdrop-blur">
                <div className="text-4xl font-semibold">
                  <LiveCounter value={4} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  focused workflow categories
                </p>
              </div>
              <div className="rounded-2xl border bg-card/70 p-5 backdrop-blur">
                <div className="text-4xl font-semibold">
                  <LiveCounter value={24} suffix="h" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  target reply window for questions
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="rounded-[2rem] border border-primary/10 bg-linear-to-br from-card via-card to-primary/5 p-6 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-primary/80">
                    Quick Support
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Start with search, then jump to the right topic.
                  </h2>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for setup, borrowing, catalog, or access help"
                  className="h-13 rounded-full border-primary/10 bg-background/80 pl-11 shadow-sm"
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="h-4 w-4 text-primary" />
                    Fast navigation
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Filter by workflow so teams can get to the right answer
                    without digging.
                  </p>
                </div>
                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Clear support path
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Move from self-serve help to direct contact whenever the
                    question needs more context.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <motion.div
            variants={item}
            className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4"
          >
            {topics.map((topic) => {
              const Icon = topic.icon;
              const isActive = activeCategory === topic.id;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setActiveCategory(topic.id)}
                  className={`group rounded-[1.75rem] border p-6 text-left transition ${
                    isActive
                      ? "border-primary/30 bg-linear-to-br from-primary/12 via-card to-sky-500/10 shadow-xl"
                      : "bg-card/70 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary transition group-hover:bg-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold">{topic.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </motion.div>
        </section>

        <section className="mt-16 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={item}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-primary/80">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-4xl font-semibold">
                  Help that stays close to the work.
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setActiveCategory(category.value)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      activeCategory === category.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-[1.75rem] border bg-card/70 p-8 text-center">
                  <p className="text-lg font-medium">No answers found yet.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try a broader search or switch to another help category.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openItem === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className="overflow-hidden rounded-[1.75rem] border bg-card/78 backdrop-blur"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenItem((current) =>
                            current === faq.id ? "" : faq.id
                          )
                        }
                        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                      >
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-primary/75">
                            {faq.category.replace("-", " ")}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          >
                            <p className="px-6 pb-6 text-sm leading-7 text-muted-foreground">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>

          <motion.aside variants={item} className="xl:sticky xl:top-10">
            <div className="rounded-[2rem] border bg-linear-to-br from-card via-card to-sky-500/5 p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)]">
              <p className="text-sm uppercase tracking-[0.18em] text-primary/80">
                Support Paths
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Choose the kind of help you need.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use the help center for quick answers, then move into direct
                support when your workflow needs a more tailored response.
              </p>

              <div className="mt-6 space-y-4">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block rounded-2xl border bg-background/75 p-4 transition hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold">{link.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-primary/10 bg-primary/6 p-5">
                <p className="text-sm font-medium text-primary">
                  Need a team walkthrough?
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  For institution-specific questions, workflow reviews, or a
                  guided product conversation, contact the team directly.
                </p>
                <Button asChild className="mt-4 w-full rounded-full">
                  <Link href="/contact">
                    Talk to Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.aside>
        </section>

        <section className="mt-20">
          <motion.div
            variants={item}
            className="flex flex-col gap-8 rounded-[2.25rem] border bg-linear-to-r from-primary/10 via-background to-sky-500/10 p-8 md:p-12 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.18em] text-primary/80">
                Still stuck?
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Let&apos;s turn your question into a clear next step.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Reach the team for product walkthroughs, setup guidance, or
                support that needs more context than a help article can give.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full shadow-lg">
                <Link href="/contact">
                  Contact LibraryHub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
};

export default HelpPage;
