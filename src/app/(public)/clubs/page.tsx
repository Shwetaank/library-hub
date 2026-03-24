"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Library,
  Lock,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/helpers";
import { type Club, MOCK_CLUBS } from "./data";

const listeners = new Set<() => void>();

const joinedClubsStore = {
  get() {
    if (typeof window === "undefined") {
      return "[]";
    }

    return localStorage.getItem("joinedClubs") || "[]";
  },
  set(newValue: string[]) {
    localStorage.setItem("joinedClubs", JSON.stringify(newValue));
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

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

const categoryColors: Record<string, string> = {
  fiction: "border-primary/20 bg-primary/10 text-primary",
  "non-fiction": "border-sky-500/20 bg-sky-500/10 text-sky-600",
  mystery: "border-amber-500/20 bg-amber-500/10 text-amber-600",
  "sci-fi": "border-indigo-500/20 bg-indigo-500/10 text-indigo-600",
  romance: "border-rose-500/20 bg-rose-500/10 text-rose-600",
  fantasy: "border-violet-500/20 bg-violet-500/10 text-violet-600",
};

type ClubCardProps = {
  club: Club;
  isJoined: boolean;
  onToggle: (id: string) => void;
  priorityImage?: boolean;
};

const ClubCard = React.memo(
  ({ club, isJoined, onToggle, priorityImage = false }: ClubCardProps) => {
    return (
      <motion.article
        layout
        variants={item}
        whileHover={{ y: -5 }}
        className="group overflow-hidden rounded-[1.9rem] border border-border/80 bg-card/95 shadow-[0_20px_50px_-38px_rgba(20,33,61,0.22)] transition-colors hover:border-primary/35"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={club.image}
            alt={club.name}
            fill
            priority={priorityImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold capitalize backdrop-blur-sm",
                categoryColors[club.category] ??
                  "border-border bg-card text-muted-foreground",
              )}
            >
              {club.category}
            </span>

            {club.privacy === "private" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <Lock className="h-3 w-3" />
                Private
              </span>
            ) : null}
          </div>

          {isJoined ? (
            <span className="absolute right-4 top-4 rounded-full border border-primary/15 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
              Joined
            </span>
          ) : null}

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Current book
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {club.currentBook.title}
            </p>
            <p className="text-sm text-white/72">{club.currentBook.author}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.05em] text-foreground">
                {club.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Community-led reading circle
              </p>
            </div>
            <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {club.members.toLocaleString()} members
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {club.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border/70 bg-background/78 p-4">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">
                  {formatDate(club.currentBook.discussionDate)}
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Next discussion
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/78 p-4">
              <div className="flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold capitalize">
                  {club.privacy} access
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Club format
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => onToggle(club.id)}
              variant={isJoined ? "secondary" : "default"}
              className="w-full rounded-full sm:flex-1"
            >
              {isJoined ? "Leave Club" : "Join Club"}
            </Button>
          </div>
        </div>
      </motion.article>
    );
  },
);

ClubCard.displayName = "ClubCard";

const ClubsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);

  const joinedJSON = useSyncExternalStore(
    joinedClubsStore.subscribe,
    joinedClubsStore.get,
    () => "[]",
  );
  const joined: string[] = useMemo(() => JSON.parse(joinedJSON), [joinedJSON]);
  const joinedSet = useMemo(() => new Set(joined), [joined]);

  const toggleJoin = useCallback((id: string) => {
    const currentJoined: string[] = JSON.parse(joinedClubsStore.get());
    const isJoining = !currentJoined.includes(id);

    setClubs((prevClubs) =>
      prevClubs.map((club) =>
        club.id === id
          ? {
              ...club,
              members: isJoining
                ? club.members + 1
                : Math.max(0, club.members - 1),
            }
          : club,
      ),
    );

    const newJoined = isJoining
      ? [...currentJoined, id]
      : currentJoined.filter((clubId) => clubId !== id);

    joinedClubsStore.set(newJoined);

    if (isJoining) {
      toast.success("Successfully joined the club");
    } else {
      toast.info("You left the club");
    }
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    return clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query) ||
        club.category.toLowerCase().includes(query) ||
        club.currentBook.title.toLowerCase().includes(query),
    );
  }, [search, clubs]);

  const featured = useMemo(() => clubs.slice(0, 3), [clubs]);
  const heroClub = featured[0] ?? null;
  const secondaryClubs = featured.slice(1);

  const totalMembers = useMemo(
    () => clubs.reduce((sum, club) => sum + club.members, 0),
    [clubs],
  );

  const publicCount = useMemo(
    () => clubs.filter((club) => club.privacy === "public").length,
    [clubs],
  );

  const nextMeetings = useMemo(
    () =>
      [...clubs]
        .sort(
          (a, b) =>
            new Date(a.currentBook.discussionDate).getTime() -
            new Date(b.currentBook.discussionDate).getTime(),
        )
        .slice(0, 3),
    [clubs],
  );

  return (
    <div className="page-surface relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[58px_58px] opacity-[0.16]" />
      <div className="absolute left-[-8%] top-[8%] -z-10 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-12%] top-[16%] -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-300/12 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[22%] -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-300/10 blur-3xl" />

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
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(198,151,87,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(63,86,109,0.14),transparent_30%)]" />

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Library className="h-4 w-4" />
                Reading communities
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
                <div>
                  <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-6xl xl:text-7xl">
                    Join clubs that turn solo reading into shared momentum.
                    <span className="mt-2 block bg-linear-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
                      Full-width, social, and built around active discussion.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
                    This layout shifts clubs away from a plain card list and
                    into a community dashboard with featured spaces, upcoming
                    meetings, and a clearer browse experience.
                  </p>

                  <div className="mt-8 max-w-3xl">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search clubs, genres, or current books..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="h-14 w-full rounded-full border-2 border-border/80 bg-card/90 px-14 text-base shadow-sm outline-none transition-all focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 self-start">
                  {[
                    {
                      label: "Communities",
                      value: String(clubs.length),
                      description: "Distinct reading spaces open for discovery.",
                    },
                    {
                      label: "Total members",
                      value: totalMembers.toLocaleString(),
                      description: "Live membership shifts as readers join and leave.",
                    },
                    {
                      label: "Your clubs",
                      value: String(joined.length),
                      description: "Saved locally so the page still feels active for you.",
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
              <div className="flex h-full flex-col justify-between p-6 text-white sm:p-8">
                <div>
                  <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-white/72">
                    Community pulse
                  </div>

                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-white">
                    Clubs are easier to scan when meetings, members, and access stay visible.
                  </h2>
                  <p className="mt-5 text-sm leading-8 text-white/74 sm:text-base">
                    Public and private spaces are surfaced together here, but
                    the layout makes it much clearer which clubs are active,
                    which ones are open, and what everyone is reading.
                  </p>

                  <div className="mt-8 grid gap-3">
                    {[
                      {
                        label: "Public clubs",
                        value: publicCount,
                        icon: Users,
                      },
                      {
                        label: "Private rooms",
                        value: clubs.length - publicCount,
                        icon: Lock,
                      },
                      {
                        label: "Weekly rhythm",
                        value: "Ongoing",
                        icon: Clock3,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <stat.icon className="h-4 w-4 text-amber-300" />
                          <span className="text-sm text-white/74">
                            {stat.label}
                          </span>
                        </div>
                        <span className="text-xl font-semibold tracking-[-0.04em] text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/60">
                    Upcoming meetings
                  </p>
                  <div className="mt-4 space-y-3">
                    {nextMeetings.map((club) => (
                      <div
                        key={club.id}
                        className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {club.name}
                          </p>
                          <p className="text-xs text-white/62">
                            {club.currentBook.title}
                          </p>
                        </div>
                        <div className="text-right text-xs uppercase tracking-[0.16em] text-white/62">
                          {formatDate(club.currentBook.discussionDate)}
                        </div>
                      </div>
                    ))}
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
            <div className="grid gap-0 xl:grid-cols-[1.06fr_0.94fr]">
              <div className="border-b border-border/70 px-6 py-8 sm:px-8 xl:border-b-0 xl:border-r">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                  Featured club
                </p>

                {heroClub ? (
                  <div className="mt-5">
                    <div className="relative h-[24rem] overflow-hidden rounded-[1.9rem]">
                      <Image
                        src={heroClub.image}
                        alt={heroClub.name}
                        fill
                        sizes="(max-width: 1280px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        Editor pick
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                          {heroClub.name}
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                          {heroClub.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="stat-chip">
                        {heroClub.members.toLocaleString()} members
                      </span>
                      <span className="stat-chip">
                        Next: {formatDate(heroClub.currentBook.discussionDate)}
                      </span>
                      <span className="stat-chip">
                        Reading {heroClub.currentBook.title}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4 px-6 py-8 sm:px-8">
                {secondaryClubs.map((club) => (
                  <motion.article
                    key={club.id}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="rounded-[1.7rem] border border-border/80 bg-background/78 p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.05em] text-foreground">
                          {club.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {club.currentBook.title} by {club.currentBook.author}
                        </p>
                      </div>
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {club.description}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-border/70 bg-card/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Members
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {club.members.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-border/70 bg-card/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Discussion
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                          {formatDate(club.currentBook.discussionDate)}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}

                <div className="rounded-[1.7rem] border border-dashed border-primary/25 bg-primary/8 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Need help choosing?
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Browse by genre, discussion rhythm, or privacy level, then
                    jump to support if you want help finding the right fit.
                  </p>
                  <Button asChild variant="outline" className="mt-5 rounded-full">
                    <Link href="/contact">
                      Contact support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
                Browse all clubs
              </p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
                Full-width cards for easier community discovery.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="stat-chip">{filtered.length} visible</span>
              <span className="stat-chip">{joined.length} joined</span>
              <span className="stat-chip">Search updates live</span>
            </div>
          </motion.div>

          {filtered.length === 0 ? (
            <motion.div
              variants={item}
              className="rounded-[2rem] border border-border/80 bg-card/92 px-6 py-16 text-center shadow-sm"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                No clubs matched this search.
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Try a different genre, book title, or community name.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence>
                {filtered.map((club, index) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isJoined={joinedSet.has(club.id)}
                    onToggle={toggleJoin}
                    priorityImage={index === 0}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </motion.main>
    </div>
  );
};

export default ClubsPage;
