"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { BookOpen, Medal, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export type AuthorView = {
  name: string;
  titles: number;
  genres: string[];
  availableCopies: number;
  borrowCount: number;
  favoriteCount: number;
  latestTitle: string;
  imageUrl: string | null;
  followers: number;
  yearsActive: string;
};

export type AuthorsPageViewModel = {
  hero: {
    authorCount: number;
    titleCount: number;
    totalBorrows: number;
    totalFavorites: number;
    spotlightName: string;
  };
  authors: AuthorView[];
  spotlight: AuthorView | null;
  emerging: AuthorView[];
};

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

const AuthorsClient: React.FC<{ data: AuthorsPageViewModel }> = ({ data }) => {
  const spotlight = data.spotlight;

  return (
    <div className="page-surface relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.16]" />
      <div className="absolute left-[-8%] top-[10%] -z-10 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-10%] top-[18%] -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/12 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] -z-10 h-[30rem] w-[30rem] rounded-full bg-pink-500/10 blur-3xl" />

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col"
      >
        <section className="px-6 pb-8 pt-8 md:px-10 xl:px-16">
          <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
            <motion.section
              variants={item}
              className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/94 px-6 py-10 shadow-[0_34px_90px_-58px_rgba(20,33,61,0.24)] sm:px-8 lg:px-10 lg:py-12"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(198,151,87,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(63,86,109,0.14),transparent_30%)]" />

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Author intelligence
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-6xl xl:text-7xl">
                    Meet the writers shaping circulation across the catalog.
                    <span className="mt-2 block bg-linear-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
                      Built like a spotlight board, not a plain directory.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
                    The authors page is designed as a full-width editorial
                    surface for discovering who drives borrowing, which names
                    readers return to, and where attention is building next.
                  </p>
                </div>

                <div className="grid gap-4 self-start">
                  {[
                    {
                      label: "Authors tracked",
                      value: String(data.hero.authorCount),
                    },
                    {
                      label: "Catalog titles",
                      value: String(data.hero.titleCount),
                    },
                    {
                      label: "Spotlight",
                      value: data.hero.spotlightName,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.6rem] border border-border/80 bg-background/72 p-5 shadow-sm backdrop-blur-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.aside
              variants={item}
              className="overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/92 shadow-[0_26px_80px_-54px_rgba(20,33,61,0.24)]"
            >
              {spotlight ? (
                <div className="grid h-full gap-0 lg:grid-cols-[0.86fr_1.14fr]">
                  <div className="relative min-h-[20rem]">
                    {spotlight.imageUrl ? (
                      <Image
                        src={spotlight.imageUrl}
                        alt={spotlight.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-primary/10 text-6xl font-semibold text-primary">
                        {initials(spotlight.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      Spotlight author
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-sm uppercase tracking-[0.24em] text-primary/80">
                      {spotlight.yearsActive}
                    </p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-foreground">
                      {spotlight.name}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-muted-foreground">
                      Leading circulation with {spotlight.latestTitle} as the
                      latest highlighted title across the current catalog.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Followers
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          {compactNumber(spotlight.followers)}
                        </p>
                      </div>
                      <div className="rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Borrows
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          {spotlight.borrowCount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {spotlight.genres.slice(0, 4).map((genre) => (
                        <span key={genre} className="stat-chip">
                          {genre}
                        </span>
                      ))}
                    </div>

                    <Button className="mt-6 rounded-full px-6">Follow author</Button>
                  </div>
                </div>
              ) : null}
            </motion.aside>
          </div>
        </section>

        <section className="px-6 py-6 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/90 shadow-[0_30px_80px_-56px_rgba(20,33,61,0.22)]"
          >
            <div className="grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-border/70 px-6 py-8 sm:px-8 xl:border-b-0 xl:border-r">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                  Emerging attention
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                  Authors picking up momentum right now.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                  This strip surfaces the names gaining favorites and borrowing
                  traction so readers can spot momentum before it becomes the
                  norm.
                </p>
              </div>

              <div className="grid gap-4 px-6 py-8 sm:px-8 lg:grid-cols-3">
                {data.emerging.slice(0, 3).map((author, index) => (
                  <motion.div
                    key={author.name}
                    variants={item}
                    whileHover={{ y: -6 }}
                    className="rounded-[1.7rem] border border-border/80 bg-background/78 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Rank {index + 1}
                      </div>
                      <Medal className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em]">
                      {author.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Latest: {author.latestTitle}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {author.favoriteCount.toLocaleString()} favorites and{" "}
                      {author.borrowCount.toLocaleString()} borrows across the
                      catalog.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="px-6 pb-12 pt-6 md:px-10 xl:px-16">
          <motion.div variants={item} className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
              Full roster
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
              Browse the full author network.
            </h2>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {data.authors.map((author, index) => (
              <motion.article
                key={author.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.03, ease }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[1.9rem] border border-border/80 bg-card/95 p-6 shadow-[0_20px_50px_-38px_rgba(20,33,61,0.22)] transition-colors hover:border-primary/35"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-18 w-18 text-xl">
                    {author.imageUrl ? (
                      <AvatarImage asChild>
                        <Image src={author.imageUrl} alt={author.name} fill />
                      </AvatarImage>
                    ) : (
                      <AvatarFallback>{initials(author.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                      {author.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {author.yearsActive}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {author.genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="stat-chip">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {compactNumber(author.followers)}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">Followers</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{author.titles}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">Titles</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  Latest featured title: {author.latestTitle}
                </p>

                <Button variant="outline" className="mt-6 w-full rounded-full">
                  Follow
                </Button>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
};

export default AuthorsClient;
