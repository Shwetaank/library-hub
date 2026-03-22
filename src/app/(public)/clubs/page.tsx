"use client";

import React, {
  useMemo,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Club, MOCK_CLUBS } from "./data";
import { formatDate } from "@/utils/helpers";
import { toast } from "sonner";
import {
  Calendar,
  Clock3,
  Library,
  Lock,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const categoryColors: Record<string, string> = {
  fiction: "border-primary/20 bg-primary/10 text-primary",
  "non-fiction": "border-blue-500/20 bg-blue-500/10 text-blue-500",
  mystery: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  "sci-fi": "border-indigo-500/20 bg-indigo-500/10 text-indigo-500",
  romance: "border-pink-500/20 bg-pink-500/10 text-pink-500",
  fantasy: "border-purple-500/20 bg-purple-500/10 text-purple-500",
};

interface ClubCardProps {
  club: Club;
  isJoined: boolean;
  onToggle: (id: string) => void;
  priorityImage?: boolean;
}

const ClubCard = React.memo(
  ({ club, isJoined, onToggle, priorityImage = false }: ClubCardProps) => {
    return (
      <motion.div
        variants={fadeUp}
        layout
        className="group overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:!border-primary/40 hover:shadow-lg"
      >
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priorityImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-sm",
                categoryColors[club.category] ??
                  "border-border bg-card text-muted-foreground",
              )}
            >
              {club.category}
            </span>

            {club.privacy === "private" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <Lock className="h-3 w-3" />
                Private
              </span>
            ) : null}
          </div>
          {isJoined ? (
            <span className="absolute right-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              Joined
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {club.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Community-led reading club
          </p>

          <p className="mb-5 mt-4 text-base leading-7 text-muted-foreground">
            {club.description}
          </p>

          <div className="mb-5 rounded-[1.2rem] border bg-muted/40 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Current Book
            </div>
            <div className="mt-2 text-base font-semibold text-foreground">
              {club.currentBook.title}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {club.currentBook.author}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {club.members.toLocaleString()}
              </span>
              <span className="text-muted-foreground">members</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {formatDate(club.currentBook.discussionDate)}
              </span>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => onToggle(club.id)}
              variant={isJoined ? "secondary" : "default"}
              className="w-full rounded-full sm:flex-1"
            >
              {isJoined ? "Leave Club" : "Join Club"}
            </Button>
          </div>
        </div>
      </motion.div>
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
  const totalMembers = useMemo(
    () => clubs.reduce((sum, club) => sum + club.members, 0),
    [clubs],
  );

  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Library className="h-4 w-4" />
                  Reading Clubs
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Community-driven reading experiences for shared discovery.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  Explore clubs by genre, join reading groups that match your interests, and
                  follow upcoming discussions through a cleaner product flow.
                </p>
                <div className="mt-8 max-w-xl">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search clubs, genres, or current books..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-14 w-full rounded-full border-2 border-border/80 bg-card/90 px-14 text-base shadow-sm outline-none transition-all focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <Card className="ui-card-elevated rounded-[1.7rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-base font-semibold">Club Activity</div>
                    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                      Live
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border bg-background/70 p-3 text-center">
                      <Sparkles className="mx-auto mb-2 h-5 w-5 text-primary" />
                      <div className="text-lg font-semibold">{featured.length}</div>
                      <div className="text-xs text-muted-foreground">Featured</div>
                    </div>
                    <div className="rounded-xl border bg-background/70 p-3 text-center">
                      <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
                      <div className="text-lg font-semibold">
                        {totalMembers.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="rounded-xl border bg-background/70 p-3 text-center">
                      <Clock3 className="mx-auto mb-2 h-5 w-5 text-primary" />
                      <div className="text-lg font-semibold">Weekly</div>
                      <div className="text-xs text-muted-foreground">Chats</div>
                    </div>
                  </div>
                </Card>

                <Card className="ui-card-elevated rounded-[1.7rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="text-base font-semibold">What you can do here</div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Find clubs by reading interest or genre",
                      "Track current books and discussion dates",
                      "Join and leave clubs with live membership updates",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-lg border bg-background/70 px-4 py-3"
                      >
                        <Sparkles className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground/85">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">
              Featured
            </div>
            <h2 className="section-title mt-4">
              Community spaces shaping the reading experience.
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {featured.map((club, i) => (
              <ClubCard
                key={club.id}
                club={club}
                isJoined={joinedSet.has(club.id)}
                onToggle={toggleJoin}
                priorityImage={i === 0}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/70 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore
            </div>
            <h2 className="section-title mt-4">
              Search all clubs
            </h2>
             <p className="section-copy mt-5 !text-lg">
                  Results update based on club name, category, and current reading picks.
                </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card px-6 py-20 text-center text-muted-foreground">
              No clubs found for your current search.
            </div>
          ) : (
            <motion.div
              layout
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence>
                {filtered.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isJoined={joinedSet.has(club.id)}
                    onToggle={toggleJoin}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-[2.25rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_24%),color-mix(in_oklch,var(--color-card)_92%,transparent)] px-8 py-10 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                  Want help choosing the right club?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-9 text-muted-foreground">
                  Reach out to the team if you want help finding the best fit for your genre,
                  reading goals, or discussion style.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-self-end">
                <Button asChild size="lg" className="rounded-2xl bg-primary px-7 text-primary-foreground hover:bg-primary/92">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubsPage;
