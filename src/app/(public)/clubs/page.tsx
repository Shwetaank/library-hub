"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Club, MOCK_CLUBS } from "@/lib/clubs";
import { Users, Calendar, BookOpen, Lock, Search } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               Category Colors                              */
/* -------------------------------------------------------------------------- */

const categoryColors: Record<string, string> = {
  fiction: "bg-blue-100 text-blue-800",
  "non-fiction": "bg-green-100 text-green-800",
  mystery: "bg-purple-100 text-purple-800",
  "sci-fi": "bg-cyan-100 text-cyan-800",
  romance: "bg-pink-100 text-pink-800",
};

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

const ClubsPage: React.FC = () => {
  const [joinedClubs, setJoinedClubs] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const toggleJoin = (clubId: string) => {
    setJoinedClubs((prev) =>
      prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId],
    );
  };

  const filteredClubs = useMemo<Club[]>(() => {
    return MOCK_CLUBS.filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 flex flex-col">
      <main className="flex-1">
        {/* ================= HERO ================= */}

        <section className="relative border-b bg-linear-to-r from-primary/10 to-blue-500/10 py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Join a Reading Club
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover communities, discuss books, and connect with readers who
              share your passion.
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* ================= CLUB GRID ================= */}

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClubs.map((club) => {
                const isJoined = joinedClubs.includes(club.id);

                return (
                  <Card
                    key={club.id}
                    className="group rounded-2xl border border-border/50 bg-background/80 backdrop-blur hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Cover */}
                    <div className="h-36 bg-linear-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary/40" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Title + Category */}
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold mb-2">
                          {club.name}
                        </h3>

                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                              categoryColors[club.category] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {club.category}
                          </span>

                          {club.privacy === "private" && (
                            <span className="flex items-center gap-1 text-xs bg-muted px-3 py-1 rounded-full">
                              <Lock className="w-3 h-3" />
                              Private
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {club.description}
                      </p>

                      {/* Current Book */}
                      <div className="bg-muted/50 rounded-xl p-4 mb-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          Currently Reading
                        </p>
                        <p className="font-medium text-sm mb-1">
                          {club.currentBook.title}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{club.currentBook.author}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(
                              club.currentBook.discussionDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Members */}
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {club.members.toLocaleString()} members
                        </span>
                      </div>

                      {/* Join Button */}
                      <Button
                        onClick={() => toggleJoin(club.id)}
                        variant={isJoined ? "default" : "outline"}
                        className={`w-full mt-auto transition ${
                          isJoined
                            ? "bg-primary hover:opacity-90"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        {isJoined ? "Joined ✓" : "Join Club"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredClubs.length === 0 && (
              <div className="text-center text-muted-foreground mt-16">
                No clubs found.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClubsPage;
