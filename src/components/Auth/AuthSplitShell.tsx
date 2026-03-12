"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AuthSplitShellProps = {
  badge: string;
  title: string;
  description: string;
  panelTitle: string;
  panelDescription: string;
  footerPrompt: string;
  footerActionLabel: string;
  footerActionHref: string;
  highlights: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  children: React.ReactNode;
};

export const AuthSplitShell: React.FC<AuthSplitShellProps> = ({
  badge,
  title,
  description,
  panelTitle,
  panelDescription,
  footerPrompt,
  footerActionLabel,
  footerActionHref,
  highlights,
  children,
}) => {
  return (
    <section className="page-surface relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.12),transparent_24%)]" />
      <div className="noise-grid pointer-events-none absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="container relative mx-auto">
        <div className="glass-panel overflow-hidden rounded-[2rem] border border-primary/10 shadow-[0_30px_90px_-52px_rgba(79,70,229,0.45)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden border-b border-primary/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.10),transparent_40%,rgba(245,158,11,0.08))]" />
              <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

              <div className="relative">
                <Badge
                  variant="outline"
                  className="mb-6 rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
                >
                  <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                  {badge}
                </Badge>

                <div className="mb-8 flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-primary/20 bg-linear-to-br from-primary/18 via-primary/10 to-secondary/20 text-primary">
                    <div className="absolute inset-1 rounded-[1rem] bg-background/75" />
                    <BookOpen className="relative h-7 w-7" />
                  </div>
                  <div>
                    <div className="accent-text text-3xl font-semibold leading-none">
                      LibraryHub
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Modern library operations
                    </div>
                  </div>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl"
                >
                  <span className="accent-text">{title}</span>
                </motion.h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {description}
                </p>

                <div className="mt-10 space-y-4">
                  {highlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.5rem] border border-primary/10 bg-background/76 p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{item.title}</div>
                            <div className="mt-1 text-sm leading-7 text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="mx-auto max-w-md">
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-3xl font-semibold tracking-tight">{panelTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {panelDescription}
                  </p>
                </div>

                {children}

                <div className="mt-8 text-center text-sm text-muted-foreground lg:text-left">
                  {footerPrompt}{" "}
                  <Link
                    href={footerActionHref}
                    className="inline-flex items-center gap-1 font-semibold text-foreground transition hover:text-primary"
                  >
                    {footerActionLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
