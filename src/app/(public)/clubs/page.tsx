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
import { Badge } from "@/components/ui/badge";
import { Club, MOCK_CLUBS } from "./data";
import { formatDate } from "@/utils/helpers";
import { toast } from "sonner";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Library,
  Lock,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

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
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const categoryColors: Record<string, string> = {
  fiction: "border-blue-200 bg-blue-500/10 text-blue-600",
  "non-fiction": "border-emerald-200 bg-emerald-500/10 text-emerald-600",
  mystery: "border-purple-200 bg-purple-500/10 text-purple-600",
  "sci-fi": "border-cyan-200 bg-cyan-500/10 text-cyan-600",
  romance: "border-pink-200 bg-pink-500/10 text-pink-600",
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
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <Card className="glass-panel mesh-card flex h-full flex-col overflow-hidden rounded-[1.7rem]">
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={club.image}
              alt={club.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              priority={priorityImage}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/15 to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-sm ${
                  categoryColors[club.category] ??
                  "border-primary/10 bg-background/75 text-muted-foreground"
                }`}
              >
                {club.category}
              </span>

              {club.privacy === "private" ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/10 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/75 backdrop-blur-sm">
                  <Lock className="h-3 w-3" />
                  Private
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {club.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Community-led reading club
                </p>
              </div>
              {isJoined ? (
                <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Joined
                </span>
              ) : null}
            </div>

            <p className="mb-5 text-sm leading-7 text-muted-foreground">
              {club.description}
            </p>

            <div className="mb-5 rounded-[1.25rem] border border-primary/10 bg-background/78 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Current Book
              </div>
              <div className="mt-2 text-base font-semibold text-foreground">
                {club.currentBook.title}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {club.currentBook.author}
              </div>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-background/75 px-4 py-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Members
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {club.members.toLocaleString()}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-background/75 px-4 py-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-secondary" />
                  Discussion
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {formatDate(club.currentBook.discussionDate)}
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => onToggle(club.id)}
                variant={isJoined ? "secondary" : "outline"}
                className="w-full rounded-full border-primary/10 sm:flex-1"
              >
                {isJoined ? "Leave Club" : "Join Club"}
              </Button>

              <Button
                asChild
                className="w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_16px_40px_-24px_rgba(79,70,229,0.45)] sm:flex-1"
              >
                <Link href="/contact">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
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
      <section className="relative overflow-hidden px-6 py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.12),transparent_24%)]" />
        <div className="noise-grid pointer-events-none absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="container relative mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
              >
                <Library className="mr-1.5 h-3.5 w-3.5" />
                Reading Clubs
              </Badge>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                <span className="accent-text">
                  Community-driven reading experiences built around shared discovery
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Explore clubs by genre, join reading groups that match your interests,
                and follow upcoming discussions through a cleaner product flow.
              </p>

              <div className="mt-8 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search clubs, genres, or current books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-14 rounded-full border-primary/10 bg-background/80 pl-14 text-base shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                  {clubs.length} active clubs
                </span>
                <span className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                  {totalMembers.toLocaleString()} community members
                </span>
                <span className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                  Live discussion schedules
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-shell p-5 sm:p-6">
              <div className="grid gap-4">
                <Card className="glass-panel rounded-[1.5rem] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Club Activity</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Current network overview
                      </div>
                    </div>
                    <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Community Live
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-primary/10 bg-background/75 p-4 text-center">
                      <Sparkles className="mx-auto mb-2 h-4 w-4 text-primary" />
                      <div className="text-lg font-semibold">{featured.length}</div>
                      <div className="text-xs text-muted-foreground">Featured</div>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-background/75 p-4 text-center">
                      <Users className="mx-auto mb-2 h-4 w-4 text-primary" />
                      <div className="text-lg font-semibold">
                        {totalMembers.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-background/75 p-4 text-center">
                      <Clock3 className="mx-auto mb-2 h-4 w-4 text-secondary" />
                      <div className="text-lg font-semibold">Weekly</div>
                      <div className="text-xs text-muted-foreground">Discussions</div>
                    </div>
                  </div>
                </Card>

                <Card className="glass-panel rounded-[1.5rem] p-5">
                  <div className="text-sm font-semibold">What you can do here</div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Find clubs by reading interest or genre",
                      "Track current books and discussion dates",
                      "Join and leave clubs with live membership updates",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/75 px-4 py-3"
                      >
                        <Sparkles className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-foreground/85">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full border border-primary/15 bg-primary/10 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Featured clubs
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Community spaces currently shaping the reading experience.
              </p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {featured.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                isJoined={joinedSet.has(club.id)}
                onToggle={toggleJoin}
                priorityImage
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-primary/10 px-6 py-16 sm:py-20">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full border border-secondary/15 bg-secondary/10 p-2 text-secondary">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Explore all clubs
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Search results update based on club name, category, and current reading picks.
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="glass-panel rounded-[1.8rem] px-6 py-14 text-center text-muted-foreground">
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

      <section className="px-6 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="container mx-auto">
          <div className="glass-panel mesh-card relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_28%),linear-gradient(135deg,rgba(79,70,229,0.05),transparent_45%,rgba(245,158,11,0.08))]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Want help choosing the right reading club?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Reach out to the team if you want help finding the best fit for
                your genre, reading goals, or discussion style.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-linear-to-r from-primary to-secondary px-8 text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.55)]"
                >
                  <Link href="/contact">
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
