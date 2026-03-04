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

/* Animated underline */
const linkClass =
  "relative w-fit text-sm text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

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
    { icon: GithubIcon, href: "https://github.com/Shwetaank", label: "GitHub" },
    {
      icon: LinkedinIcon,
      href: "https://www.linkedin.com/in/shwetank-morey-a35484257/",
      label: "LinkedIn",
    },
    { icon: X, href: "https://x.com/Sin_Greed___", label: "X (Twitter)" },
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
    <footer className="relative border-t bg-background">
      {/* Gradient Border */}
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-tr from-primary/5 via-transparent to-purple-500/5 blur-3xl" />

      <div className="container mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* ================= Brand ================= */}
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left cursor-pointer">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <BookOpen className="h-10 w-10 text-primary animate-pulse" />
              <h2 className="text-4xl font-bold pb-1 bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
                LibraryHub
              </h2>

              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
              >
                v1.0.1
              </motion.span>
            </div>

            <p className="text-muted-foreground mx-auto lg:mx-0 leading-relaxed text-justify">
              Discover, borrow, and manage books seamlessly with a scalable
              cloud-powered architecture built using Next.js, Prisma, and Azure.
            </p>

            {/* Social Icons */}
            <TooltipProvider>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.3 }}
                        className="p-3 rounded-full border hover:bg-primary/10 shadow-sm transition"
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

          {/* ================= Product ================= */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
              Product
            </h4>
            <div className="flex flex-col space-y-3">
              <Link href="/books" className={linkClass}>
                Browse Books
              </Link>
              <Link href="/dashboard" className={linkClass}>
                Dashboard
              </Link>
              <Link href="/favorites" className={linkClass}>
                Favorites
              </Link>
            </div>
          </div>

          {/* ================= Company ================= */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
              Company
            </h4>
            <div className="flex flex-col space-y-3">
              <Link href="/about" className={linkClass}>
                About
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link href="/help" className={linkClass}>
                Help Center
              </Link>
            </div>
          </div>

          {/* ================= Newsletter ================= */}
          <div className="space-y-5 text-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
              Stay Updated
            </h4>

            <div className="flex flex-col gap-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="cursor-pointer bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 text-white dark:text-black hover:opacity-90 transition"
                >
                  {loading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1">
              <Globe className="h-5 w-5 text-primary" /> Next.js
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-5 w-5 text-primary" /> Prisma
            </div>
            <div className="flex items-center gap-1">
              <Server className="h-5 w-5 text-primary" /> Azure
            </div>
          </div>

          <p>
            {"\u00A9"} {new Date().getFullYear()}
            <span
              className="mx-1 font-semibold bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:underline"
              onClick={() =>
                window.open("https://libraryhub.vercel.app", "_blank")
              }
            >
              LibraryHub.
            </span>
            All rights reserved.
          </p>
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
    </footer>
  );
};

export default Footer;
