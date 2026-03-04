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
  Users,
  Calendar,
  Lock,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* localStorage Store for Joined Clubs                                        */
/* -------------------------------------------------------------------------- */

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
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/* -------------------------------------------------------------------------- */
/* Animation Variants                                                         */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/* -------------------------------------------------------------------------- */
/* Category Colors                                                            */
/* -------------------------------------------------------------------------- */

const categoryColors: Record<string, string> = {
  fiction: "bg-blue-500/10 text-blue-600 border-blue-200",
  "non-fiction": "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  mystery: "bg-purple-500/10 text-purple-600 border-purple-200",
  "sci-fi": "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  romance: "bg-pink-500/10 text-pink-600 border-pink-200",
};

/* -------------------------------------------------------------------------- */
/* Club Card                                                                  */
/* -------------------------------------------------------------------------- */

interface ClubCardProps {
  club: Club;
  isJoined: boolean;
  onToggle: (id: string) => void;
}

const ClubCard = React.memo(({ club, isJoined, onToggle }: ClubCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <Card className="rounded-2xl border border-border/60 bg-background shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden group">
        {/* IMAGE */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold  bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent text-lg  mb-2">
            {club.name}
          </h3>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`text-xs px-3 py-1 rounded-full border capitalize font-medium ${
                categoryColors[club.category] ??
                "bg-muted text-muted-foreground border"
              }`}
            >
              {club.category}
            </span>

            {club.privacy === "private" && (
              <span className="flex items-center gap-1 text-xs bg-muted px-3 py-1 rounded-full border">
                <Lock className="w-3 h-3" />
                Private
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-justify line-clamp-2 mb-4">
            {club.description}
          </p>

          {/* CURRENT BOOK */}
          <div className="bg-muted/40 rounded-lg p-3 mb-4 text-md">
            <p className="font-medium">{club.currentBook.title}</p>
            <p className="text-muted-foreground">{club.currentBook.author}</p>
          </div>

          {/* META */}
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              {club.members.toLocaleString()}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Calendar className="w-4 h-4 animate-pulse" />
              {formatDate(club.currentBook.discussionDate)}
            </div>
          </div>

          {/* JOIN BUTTON */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onToggle(club.id)}
              variant={isJoined ? "default" : "outline"}
              className="w-full mt-auto rounded-2xl text-white dark:text-black  bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 cursor-pointer "
            >
              {isJoined ? "Joined âœ“" : "Join Club"}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
});

ClubCard.displayName = "ClubCard";

/* -------------------------------------------------------------------------- */
/* Main Page                                                                  */
/* -------------------------------------------------------------------------- */

const ClubsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);

  const joinedJSON = useSyncExternalStore(
    joinedClubsStore.subscribe,
    joinedClubsStore.get,
    () => "[]",
  );
  const joined: string[] = useMemo(() => JSON.parse(joinedJSON), [joinedJSON]);

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

    let newJoined: string[];
    if (isJoining) {
      toast.success("Successfully joined the club ðŸŽ‰");
      newJoined = [...currentJoined, id];
    } else {
      toast.info("You left the club");
      newJoined = currentJoined.filter((c) => c !== id);
    }
    joinedClubsStore.set(newJoined);
  }, []);

  /* ---------------- Filtering ---------------- */

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q) ||
        club.category.toLowerCase().includes(q),
    );
  }, [search, clubs]);

  const featured = useMemo(() => clubs.slice(0, 3), [clubs]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="py-20 px-6 border-b bg-linear-to-br from-primary/5 via-background to-blue-500/5">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="w-max-7xl mx-auto text-center"
        >
          <h1 className="text-4xl pb-10 sm:text-6xl font-bold bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Community Driven Reading Experience
          </h1>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl shadow-sm"
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-semibold">Featured Clubs</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featured.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                isJoined={joined.includes(club.id)}
                onToggle={toggleJoin}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ALL CLUBS */}
      <section className="py-16 px-6 border-t">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-semibold">Explore All Clubs</h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No clubs found.
            </div>
          ) : (
            <motion.div
              layout
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filtered.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isJoined={joined.includes(club.id)}
                    onToggle={toggleJoin}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClubsPage;
