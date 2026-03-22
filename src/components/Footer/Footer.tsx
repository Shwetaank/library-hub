"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, GithubIcon, LinkedinIcon, YoutubeIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const linkClass = "text-sm text-muted-foreground transition hover:text-foreground";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setEmail("");
      toast.success("Subscribed");
    } catch {
      toast.error("Subscription failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="pb-8">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="rounded-[2.2rem] border border-border/70 bg-card/92 px-6 py-8 shadow-[0_24px_70px_-58px_rgba(20,33,61,0.16)] backdrop-blur-xl sm:px-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.2fr]">
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-semibold tracking-[-0.05em] text-foreground">LibraryHub</div>
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Discovery-led library platform
                  </div>
                </div>
              </Link>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                A redesigned library product for calmer discovery, clearer borrowing flows, and
                reader workspaces that feel connected from the first click to the final return.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Catalog browsing", "Reader accounts", "Modern circulation"].map((item) => (
                  <span key={item} className="stat-chip">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { href: "https://github.com/Shwetaank", icon: GithubIcon, label: "GitHub" },
                  {
                    href: "https://www.linkedin.com/in/shwetank-morey-a35484257/",
                    icon: LinkedinIcon,
                    label: "LinkedIn",
                  },
                  { href: "https://www.youtube.com/@Sin_Greed", icon: YoutubeIcon, label: "YouTube" },
                ].map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    asChild
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background/80"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Product
              </div>
              <div className="flex flex-col space-y-3">
                <Link href="/catalog" className={linkClass}>
                  Discover books
                </Link>
                <Link href="/authors" className={linkClass}>
                  Explore authors
                </Link>
                <Link href="/clubs" className={linkClass}>
                  Reading clubs
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Company
              </div>
              <div className="flex flex-col space-y-3">
                <Link href="/about" className={linkClass}>
                  About LibraryHub
                </Link>
                <Link href="/contact" className={linkClass}>
                  Contact sales
                </Link>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-border/70 bg-muted/50 p-5">
              <div className="text-lg font-semibold tracking-[-0.04em]">Get product updates</div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Receive release notes, new catalog experiences, and design improvements in your inbox.
              </p>
              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubscribe();
                }}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="h-11 rounded-full bg-background/80"
                />
                <Button type="submit" className="w-full rounded-full btn-brand" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-8 bg-border/70" />

          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>&copy; {new Date().getFullYear()} LibraryHub. Designed for modern library experiences.</div>
            <a
              href="https://shwet.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Shwetank Morey <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
