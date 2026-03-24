"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Compass,
  LibraryBig,
  Search,
  Sparkles,
  Star,
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

export type CatalogBookView = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: number;
  availabilityLabel: string;
  rating: number;
  reviews: number;
  coverSrc: string;
};

export type CatalogPageViewModel = {
  hero: {
    titleCount: number;
    availableCopies: number;
    genreCount: number;
    borrowCount: number;
    favoriteCount: number;
  };
  genres: string[];
  books: CatalogBookView[];
  featuredBooks: CatalogBookView[];
  availableBooks: CatalogBookView[];
  activeGenre: string;
  activeQuery: string;
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

function genreHref(genre: string, activeQuery: string) {
  if (genre === "All") {
    return activeQuery ? `/catalog?q=${encodeURIComponent(activeQuery)}` : "/catalog";
  }

  return `/catalog?genre=${encodeURIComponent(genre)}${
    activeQuery ? `&q=${encodeURIComponent(activeQuery)}` : ""
  }`;
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

const CatalogClient: React.FC<{ data: CatalogPageViewModel }> = ({ data }) => {
  const hasFilters = Boolean(data.activeQuery) || data.activeGenre !== "All";
  const featuredLead = data.featuredBooks[0] ?? null;

  return (
    <div className="page-surface relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.16]" />
      <div className="absolute left-[-8%] top-[8%] -z-10 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-10%] top-[18%] -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/12 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] -z-10 h-[30rem] w-[30rem] rounded-full bg-teal-400/10 blur-3xl" />

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col"
      >
        <section className="px-6 pb-8 pt-8 md:px-10 xl:px-16">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <motion.section
              variants={item}
              className="relative overflow-hidden rounded-[2.6rem] border border-border/80 bg-card/94 px-6 py-10 shadow-[0_34px_90px_-58px_rgba(20,33,61,0.24)] sm:px-8 lg:px-10 lg:py-12"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(198,151,87,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(63,86,109,0.14),transparent_30%)]" />

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Compass className="h-4 w-4" />
                Discovery command center
              </div>

              <div className="mt-8">
                <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-6xl xl:text-7xl">
                  Browse the entire library through a wider, faster discovery surface.
                  <span className="mt-2 block bg-linear-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
                    Search, filter, and compare titles without the page tightening up.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
                  Catalog now behaves more like a product workspace: quick
                  search at the top, visible collection cues, and roomy result
                  cards that keep cover, author, rating, and availability in one scan.
                </p>
              </div>

              <form action="/catalog" className="mt-8 rounded-[2rem] border border-border/80 bg-background/75 p-4 shadow-sm">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    name="q"
                    defaultValue={data.activeQuery}
                    placeholder="Search by title, author, or keyword..."
                    className="h-14 w-full rounded-full border-2 border-border/80 bg-card/90 px-14 text-base shadow-sm outline-none transition-all focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
                  />
                  {data.activeGenre !== "All" ? (
                    <input type="hidden" name="genre" value={data.activeGenre} />
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {["All", ...data.genres].map((genre) => {
                    const active = genre === data.activeGenre;

                    return (
                      <Button
                        key={genre}
                        asChild
                        variant={active ? "default" : "outline"}
                        className="rounded-full bg-card/90 px-6 shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <Link href={genreHref(genre, data.activeQuery)}>{genre}</Link>
                      </Button>
                    );
                  })}
                </div>
              </form>
            </motion.section>

            <motion.aside
              variants={item}
              className="overflow-hidden rounded-[2.3rem] border border-border/80 bg-slate-950 shadow-[0_26px_80px_-54px_rgba(20,33,61,0.28)]"
            >
              <div className="flex h-full flex-col justify-between p-6 text-white sm:p-8">
                <div>
                  <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-white/72">
                    Browse status
                  </div>

                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-white">
                    A full-width catalog keeps discovery fluid even when filters stack up.
                  </h2>
                  <p className="mt-5 text-sm leading-8 text-white/74 sm:text-base">
                    The right rail now works like a live summary panel so readers
                    can see what is available, what is filtered, and where to go next.
                  </p>

                  <div className="mt-8 grid gap-3">
                    {[
                      {
                        label: "Titles visible",
                        value: compactNumber(data.hero.titleCount),
                      },
                      {
                        label: "Available copies",
                        value: compactNumber(data.hero.availableCopies),
                      },
                      {
                        label: "Genres",
                        value: compactNumber(data.hero.genreCount),
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <span className="text-sm text-white/72">{stat.label}</span>
                        <span className="text-xl font-semibold tracking-[-0.04em] text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/60">
                    Current mode
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {hasFilters ? "Filtered discovery" : "Full catalog view"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {data.activeGenre !== "All"
                      ? `Genre locked to ${data.activeGenre}.`
                      : "All genres are visible right now."}{" "}
                    {data.activeQuery
                      ? `Search term: "${data.activeQuery}".`
                      : "No keyword filter applied."}
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full border border-white/14 bg-white text-foreground hover:bg-white/92"
                    >
                      <Link href={featuredLead ? `/catalog/${featuredLead.id}` : "/catalog"}>
                        Open featured title
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-full border-white/18 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                    >
                      <Link href="/bestsellers">See bestseller board</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="px-6 py-6 md:px-10 xl:px-16">
          <motion.div
            variants={item}
            className="overflow-hidden rounded-[2.3rem] border border-border/80 bg-card/92 shadow-[0_30px_80px_-56px_rgba(20,33,61,0.22)]"
          >
            <div className="grid gap-0 xl:grid-cols-[0.94fr_1.06fr]">
              <div className="border-b border-border/70 px-6 py-8 sm:px-8 xl:border-b-0 xl:border-r">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                  Featured shelves
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                  Curated titles stay up front, not buried below the fold.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Instead of dropping straight into a dense grid, the catalog opens
                  with a small shelf of featured books and quick availability cues.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {data.availableBooks.slice(0, 6).map((book) => (
                    <span key={book.id} className="stat-chip">
                      {book.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 px-6 py-8 sm:px-8 lg:grid-cols-3">
                {data.featuredBooks.map((book, index) => (
                  <motion.article
                    key={book.id}
                    variants={item}
                    whileHover={{ y: -6 }}
                    className="group overflow-hidden rounded-[1.8rem] border border-border/80 bg-background/78 shadow-sm transition-colors hover:border-primary/35"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={book.coverSrc}
                        alt={book.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        Shelf {index + 1}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating, "text-white/90")}
                        </div>
                        <p className="mt-1.5 text-xs text-white/75">
                          {book.reviews} reviews
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                          {book.availabilityLabel}
                        </span>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-muted-foreground transition-colors group-hover:text-primary"
                        >
                          <Link href={`/catalog/${book.id}`}>
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
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
                Discovery results
              </p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                Browse results in wider, easier-to-read cards.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                Covers, author details, ratings, and availability now sit in one
                horizontal flow so scanning feels quicker on large screens.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="stat-chip">
                <LibraryBig className="mr-2 h-4 w-4" />
                {data.books.length} results
              </span>
              <span className="stat-chip">
                <Sparkles className="mr-2 h-4 w-4" />
                Full-width layout
              </span>
            </div>
          </motion.div>

          {data.books.length > 0 ? (
            <motion.div
              variants={item}
              className="grid gap-5 xl:grid-cols-2"
            >
              {data.books.map((book, index) => (
                <motion.article
                  key={book.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.03, ease }}
                  whileHover={{ y: -4 }}
                  className="grid gap-5 overflow-hidden rounded-[1.9rem] border border-border/80 bg-card/95 p-5 shadow-[0_20px_50px_-38px_rgba(20,33,61,0.22)] sm:grid-cols-[12rem_1fr]"
                >
                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] sm:h-full">
                    <Image
                      src={book.coverSrc}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {book.genre}
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
                        {book.availabilityLabel}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-1">
                      {renderStars(book.rating)}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {book.reviews} reviews
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
                      <div className="rounded-[1.2rem] border border-border/70 bg-background/78 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Genre
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {book.genre}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-border/70 bg-background/78 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Availability
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {book.available}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-border/70 bg-background/78 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Reader score
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {book.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="rounded-full">
                        <Link href={`/catalog/${book.id}`}>
                          View details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={item}
              className="rounded-[2rem] border border-border/80 bg-card/92 px-6 py-16 text-center shadow-sm"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                No books matched this search.
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Try another title, author, or keyword to widen the result set.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full px-8">
                  <Link href="/catalog">Reset catalog</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </section>
      </motion.main>
    </div>
  );
};

export default CatalogClient;
