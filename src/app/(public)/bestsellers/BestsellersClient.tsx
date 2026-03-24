"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Medal,
  Repeat2,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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

export type BestsellerBookView = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  available: number;
  totalCopies: number;
  coverSrc: string;
  borrowCount: number;
  favoriteCount: number;
  returnedCount: number;
  activeCount: number;
  rating: number;
  reviews: number;
  momentum: number;
};

export type BestsellersPageViewModel = {
  hero: {
    totalCirculations: number;
    activeLoans: number;
    featuredTitle: string;
    featuredBorrowCount: number;
  };
  topThree: BestsellerBookView[];
  ranked: BestsellerBookView[];
  trending: BestsellerBookView[];
};

function renderStars(rating: number, className?: string) {
  const filled = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < filled
          ? "fill-amber-400 text-amber-400"
          : "text-muted-foreground/35"
      } ${className ?? ""}`}
    />
  ));
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

const podiumAccent = [
  "from-slate-900 via-slate-800 to-slate-700",
  "from-amber-600 via-amber-500 to-orange-400",
  "from-stone-700 via-stone-600 to-stone-500",
];

const BestsellersClient: React.FC<{ data: BestsellersPageViewModel }> = ({
  data,
}) => {
  const leader = data.topThree[0] ?? null;

  return (
    <div className="page-surface relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[56px_56px] opacity-[0.16]" />
      <div className="absolute left-[-8%] top-[10%] -z-10 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-8%] top-[14%] -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/14 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[25%] -z-10 h-[30rem] w-[30rem] rounded-full bg-rose-400/10 blur-3xl" />

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col"
      >
        <section className="px-6 pb-8 pt-8 md:px-10 xl:px-16">
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
            <motion.section
              variants={item}
              className="relative overflow-hidden rounded-[2.6rem] border border-border/80 bg-card/94 px-6 py-10 shadow-[0_34px_90px_-58px_rgba(20,33,61,0.24)] sm:px-8 lg:px-10 lg:py-12"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(198,151,87,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(63,86,109,0.15),transparent_30%)]" />

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Trophy className="h-4 w-4" />
                Bestseller leaderboard
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
                <div>
                  <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-6xl xl:text-7xl">
                    Ranking the books readers actually return to.
                    <span className="mt-2 block bg-linear-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
                      Designed like a live board, not a static gallery.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
                    This full-width page turns bestseller data into a sharper
                    leaderboard experience with podium cards, momentum signals,
                    and ranked entries that stay easy to scan.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full px-6">
                      <Link href={leader ? `/catalog/${leader.id}` : "/catalog"}>
                        Open current leader
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full px-6"
                    >
                      <Link href="/catalog">Explore full catalog</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 self-start">
                  {[
                    {
                      label: "Circulations",
                      value: compactNumber(data.hero.totalCirculations),
                      description: "Total borrow activity across ranked titles.",
                    },
                    {
                      label: "Active loans",
                      value: compactNumber(data.hero.activeLoans),
                      description: "Books still out with readers right now.",
                    },
                    {
                      label: "Current leader",
                      value: data.hero.featuredTitle,
                      description: `${data.hero.featuredBorrowCount.toLocaleString()} borrow signals.`,
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
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.aside
              variants={item}
              className="overflow-hidden rounded-[2.3rem] border border-border/80 bg-slate-950 shadow-[0_26px_80px_-54px_rgba(20,33,61,0.28)]"
            >
              {leader ? (
                <div className="grid h-full gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-[20rem]">
                    <Image
                      src={leader.coverSrc}
                      alt={leader.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                      Rank 1
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-center gap-1">
                        {renderStars(leader.rating, "text-white/85")}
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">
                        {leader.reviews} reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 text-white sm:p-8">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                        Bestseller of the moment
                      </p>
                      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">
                        {leader.title}
                      </h2>
                      <p className="mt-2 text-base text-white/70">
                        {leader.author}
                      </p>
                      <p className="mt-5 text-sm leading-7 text-white/74">
                        {leader.description}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                          Borrows
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          {leader.borrowCount.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                          Available
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          {leader.available}/{leader.totalCopies}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.aside>
          </div>
        </section>

        <section className="px-6 py-6 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="overflow-hidden rounded-[2.3rem] border border-border/80 bg-card/92 shadow-[0_30px_80px_-56px_rgba(20,33,61,0.22)]"
          >
            <div className="flex items-center justify-between border-b border-border/70 px-6 py-6 sm:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                  Podium
                </p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                  The three books setting the pace.
                </h2>
              </div>
              <div className="hidden rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary lg:inline-flex">
                Updated from live circulation data
              </div>
            </div>

            <div className="grid gap-5 px-6 py-8 sm:px-8 lg:grid-cols-3">
              {data.topThree.map((book, index) => (
                <motion.article
                  key={book.id}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-[1.9rem] border border-border/80 bg-background/80 shadow-sm"
                >
                  <div
                    className={`relative flex min-h-[12rem] flex-col justify-end bg-gradient-to-br p-5 text-white ${podiumAccent[index] ?? podiumAccent[0]}`}
                  >
                    <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                      Rank {index + 1}
                    </div>
                    <Medal className="mb-5 h-8 w-8 text-white/80" />
                    <h3 className="text-3xl font-semibold tracking-[-0.05em]">
                      {book.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/72">{book.author}</p>
                  </div>

                  <div className="grid gap-5 p-5">
                    <div className="relative h-56 overflow-hidden rounded-[1.4rem]">
                      <Image
                        src={book.coverSrc}
                        alt={book.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-[1.2rem] border border-border/70 bg-card/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Borrows
                        </p>
                        <p className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                          {compactNumber(book.borrowCount)}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-border/70 bg-card/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Favorites
                        </p>
                        <p className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                          {compactNumber(book.favoriteCount)}
                        </p>
                      </div>
                    </div>

                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={`/catalog/${book.id}`}>Open details</Link>
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-6 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="grid gap-5 rounded-[2.2rem] border border-border/80 bg-card/92 px-6 py-8 shadow-[0_26px_70px_-54px_rgba(20,33,61,0.22)] sm:px-8 xl:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                Momentum watch
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                Fast risers worth watching next.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Trending titles are separated from the main ranking so the page
                can show what is climbing quickly, not only what is already on top.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.trending.slice(0, 6).map((book) => (
                <motion.article
                  key={book.id}
                  variants={item}
                  whileHover={{ y: -4 }}
                  className="rounded-[1.6rem] border border-border/80 bg-background/78 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {book.genre}
                    </span>
                    <Flame className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em]">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {book.author}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-foreground">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-semibold">
                      Momentum {compactNumber(book.momentum)}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-6 pb-12 pt-6 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                Ranked board
              </p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                Full ranking, built for side-by-side scanning.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="stat-chip">
                <Repeat2 className="mr-2 h-4 w-4" />
                Return activity included
              </span>
              <span className="stat-chip">
                <Sparkles className="mr-2 h-4 w-4" />
                Reader demand + favorites
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-5 xl:grid-cols-2"
          >
            {data.ranked.map((book, index) => (
              <motion.article
                key={book.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.03, ease }}
                whileHover={{ y: -4 }}
                className="grid gap-5 overflow-hidden rounded-[1.9rem] border border-border/80 bg-card/95 p-5 shadow-[0_20px_50px_-38px_rgba(20,33,61,0.22)] sm:grid-cols-[11rem_1fr]"
              >
                <div className="relative h-64 overflow-hidden rounded-[1.5rem] sm:h-full">
                  <Image
                    src={book.coverSrc}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    #{index + 1}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
                        {book.title}
                      </h3>
                      <p className="mt-2 text-base text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      {book.available > 0
                        ? `${book.available} available`
                        : "Waitlist"}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-1">
                    {renderStars(book.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {book.reviews} reviews
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {book.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      {
                        label: "Borrows",
                        value: compactNumber(book.borrowCount),
                      },
                      {
                        label: "Favorites",
                        value: compactNumber(book.favoriteCount),
                      },
                      {
                        label: "Returned",
                        value: compactNumber(book.returnedCount),
                      },
                      {
                        label: "Active",
                        value: compactNumber(book.activeCount),
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.2rem] border border-border/70 bg-background/78 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={`/catalog/${book.id}`}>
                        View book
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
};

export default BestsellersClient;
