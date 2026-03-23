"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Github, Linkedin, Youtube } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const navigationGroups = [
  {
    title: "Platform",
    links: [
      { label: "Browse catalog", href: "/catalog" },
      { label: "Explore authors", href: "/authors" },
      { label: "Reading clubs", href: "/clubs" },
      { label: "Bestsellers", href: "/bestsellers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Sign up", href: "/signup" },
    ],
  },
] as const;

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Shwetaank",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/shwetank-morey-a35484257/",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@Sin_Greed",
    label: "YouTube",
  },
] as const;

const footerHighlights = [
  "Role-aware access",
  "Fast catalog discovery",
  "Designed for modern libraries",
] as const;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        toast.success("Subscribed successfully.");
      } else {
        const data = await response.json();
        toast.error(data.message || "Subscription failed.");
      }
    } catch {
      toast.error("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-border/60 bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.10),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,rgba(15,23,42,0.9)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.9)_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />

      <div className="w-full px-6 md:px-10 xl:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-border/60 py-16 lg:py-20"
        >
          <div className="grid gap-10 xl:grid-cols-[1.25fr_0.75fr] xl:gap-16">
            <motion.div variants={fadeUp} className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                LibraryHub Footer
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                A full-width finish built for trust, discovery, and momentum.
              </h2>
              <p className="mt-5 max-w-2xl text-justify text-base leading-8 text-muted-foreground sm:text-lg">
                Explore the catalog, stay updated on product changes, and reach
                the team without hunting through the interface. The footer now
                works like a strong final section instead of a small
                afterthought.
              </p>

              <div className="mt-8 flex flex-wrap gap-6">
                {footerHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-background/75 px-4 py-2 text-sm text-muted-foreground backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/catalog">
                    Explore catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <Link href="/contact">Talk to the team</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Stay in the loop
                    </p>
                    <p className="mt-2 text-sm text-justify leading-7 text-muted-foreground">
                      Product updates, quality improvements, and release notes
                      delivered without spam.
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <BookOpen className="h-8 w-8 cursor-pointer animate-pulse" />
                  </div>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubscribe();
                  }}
                  className="mt-6 space-y-3"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 rounded-full bg-background/80 px-5"
                    aria-label="Email address"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-full cursor-pointer"
                  >
                    {loading ? "Subscribing..." : "Subscribe for updates"}
                  </Button>
                </form>

                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Trusted access. Clear updates. Better reading workflows.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"
        >
          <motion.div variants={fadeUp} className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>

              <div>
                <div className="text-lg font-bold text-foreground animate-pulse">
                  LibraryHub
                </div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Discovery-led system
                </div>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-7 text-justify text-muted-foreground">
              A modern platform for managing books, simplifying borrowing, and
              making the reading experience feel clear from the first search to
              the final return.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/75 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {navigationGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground/90">
                {group.title}
              </h3>

              <div className="mt-5 flex flex-col gap-4">
                {group.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-sm font-semibold text-muted-foreground transition hover:translate-x-1 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-4 border-t border-border/60 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Copyright
            <span className="font-bold animate-bounce ml-2">
              {new Date().getFullYear()} LibraryHub.
            </span>{" "}
            Built for readers, librarians, and growing digital collections.
          </p>

          <div className="flex flex-wrap items-center font-semibold gap-4">
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy policy
            </Link>
            <Link
              href="/contact"
              className="transition font-semibold hover:text-primary"
            >
              Contact
            </Link>
            <a
              href="https://github.com/Shwetaank"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-primary"
            >
              Built by <span className="font-bold">Sin Greed</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
