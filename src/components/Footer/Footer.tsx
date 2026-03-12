"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GithubIcon,
  LinkedinIcon,
  X,
  Globe,
  Database,
  Server,
  YoutubeIcon,
  Code2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const linkClass =
  "group flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return toast.error("Please enter your email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Subscribed successfully \u{1F389}");
      setEmail("");
    } catch {
      toast.error("Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: GithubIcon,
      href: "https://github.com/Shwetaank",
      label: "GitHub",
    },
    {
      icon: LinkedinIcon,
      href: "https://www.linkedin.com/in/shwetank-morey-a35484257/",
      label: "LinkedIn",
    },
    {
      icon: X,
      href: "https://x.com/Sin_Greed___",
      label: "X (Twitter)",
    },
    {
      icon: YoutubeIcon,
      href: "https://www.youtube.com/@Sin_Greed",
      label: "YouTube",
    },
    {
      icon: Code2,
      href: "https://leetcode.com/u/spmorey87/",
      label: "LeetCode",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-primary/10 bg-background">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1),transparent_24%)]" />
      <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
        <div className="rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(79,70,229,0.06),rgba(255,255,255,0.92),rgba(245,158,11,0.06))] p-6 shadow-[0_24px_80px_-50px_rgba(79,70,229,0.45)] backdrop-blur-xl dark:bg-[linear-gradient(135deg,rgba(129,140,248,0.1),rgba(15,23,42,0.94),rgba(245,158,11,0.08))] sm:p-8 lg:p-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.75fr_0.75fr_1fr]">
            <div className="space-y-6">
              <Link href="/" className="group inline-flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 via-primary/10 to-secondary/20 text-primary"
                >
                  <div className="absolute inset-1 rounded-[1rem] bg-background/70" />
                  <BookOpen className="relative h-6 w-6" />
                </motion.div>
                <div>
                  <h2 className="accent-text text-2xl font-semibold leading-none">
                    LibraryHub
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Modern library operations
                  </p>
                </div>
              </Link>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Run catalog discovery, circulation, member operations, and reporting
                from one product-shaped workspace built for modern library teams.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Catalog clarity", "Member workflows", "Real-time visibility"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/10 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>

              <div>
                <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Connect
                </div>
                <TooltipProvider>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <Tooltip key={label}>
                        <TooltipTrigger asChild>
                          <motion.a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            whileHover={{ y: -2 }}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-background/75 text-muted-foreground shadow-sm transition hover:border-secondary/20 hover:text-primary"
                          >
                            <Icon className="h-4 w-4" />
                          </motion.a>
                        </TooltipTrigger>
                        <TooltipContent>{label}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Product
              </h4>
              <div className="flex flex-col gap-3">
                <Link href="/catalog" className={linkClass}>
                  <span>Browse Books</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/dashboard" className={linkClass}>
                  <span>Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/dashboard#favorites" className={linkClass}>
                  <span>Favorites</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Company
              </h4>
              <div className="flex flex-col gap-3">
                <Link href="/about" className={linkClass}>
                  <span>About</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/contact" className={linkClass}>
                  <span>Contact</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/privacy" className={linkClass}>
                  <span>Privacy</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/help" className={linkClass}>
                  <span>Help Center</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Stay Updated
              </h4>
              <div className="rounded-[1.75rem] border border-primary/10 bg-background/78 p-5 shadow-sm backdrop-blur-sm">
                <div className="text-lg font-semibold tracking-tight">
                  Product updates and release notes
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Get platform updates, workflow improvements, and feature launches in your inbox.
                </p>

                <div className="mt-5 space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-full border-primary/10 bg-background/85 px-4"
                  />

                  <Button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_16px_40px_-22px_rgba(79,70,229,0.5)]"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  No spam. Product updates only.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-primary/10" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Globe, label: "Next.js" },
                { icon: Database, label: "Prisma" },
                { icon: Server, label: "Azure" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground lg:text-right">
              <p>
                {"\u00A9"} {new Date().getFullYear()}
                <a
                  href="https://libraryhub.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-text mx-1 cursor-pointer font-semibold hover:underline"
                >
                  LibraryHub
                </a>
                All rights reserved.
              </p>
              <p className="mt-2 text-xs">
                Designed for product-grade circulation, catalog, and member workflows.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Made by{" "}
            <a
              href="https://shwet.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-primary transition-colors"
            >
              {"Sin_Greed_\u2764\uFE0F"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
