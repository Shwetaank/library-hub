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
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
      <div className="container relative mx-auto">
        <div className="overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/92 shadow-[0_40px_120px_-86px_rgba(20,33,61,0.4)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rail-shell relative overflow-hidden rounded-none border-0 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_24%)]" />
              <div className="relative">
                <Badge
                  variant="outline"
                  className="mb-6 rounded-full border-white/10 bg-white/6 px-4 py-1.5 text-white shadow-sm"
                >
                  <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                  {badge}
                </Badge>

                <div className="mb-8 flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-foreground">
                    <BookOpen className="relative h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-3xl font-semibold leading-none text-white">
                      LibraryHub
                    </div>
                    <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/56">
                      Modern library operations
                    </div>
                  </div>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                >
                  <span>{title}</span>
                </motion.h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
                  {description}
                </p>

                <div className="mt-10 space-y-4">
                  {highlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="ink-panel p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-foreground">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{item.title}</div>
                            <div className="mt-1 text-sm leading-7 text-white/62">
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

            <div className="bg-card/94 p-8 sm:p-10">
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
