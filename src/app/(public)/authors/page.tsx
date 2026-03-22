import { BookOpen, Medal, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAuthorsPageData } from "@/lib/discovery";

export const revalidate = 300;

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

export default async function AuthorsPage() {
  const data = await getAuthorsPageData();

  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Author Intelligence
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Follow the writers driving circulation across your catalog.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  Track popular authors, their genres, latest featured titles, and the names readers
                  return to most often.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Authors tracked", value: String(data.authors.length) },
                  { label: "Top signal", value: "Borrow demand" },
                  { label: "Coverage", value: "Catalog-wide" },
                ].map((item) => (
                  <Card
                    key={item.label}
                    className="ui-card-elevated rounded-[1.7rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl"
                  >
                    <div className="text-3xl font-semibold tracking-[-0.06em]">{item.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {data.authors.map((author) => (
              <article
                key={author.name}
                className="overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <Avatar className="h-20 w-20 text-2xl">
                    {author.imageUrl ? (
                      <AvatarImage asChild>
                        <Image src={author.imageUrl} alt={author.name} fill />
                      </AvatarImage>
                    ) : (
                      <AvatarFallback>{initials(author.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {author.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{author.yearsActive}</p>
                  </div>
                </div>

                <p className="mt-6 line-clamp-2 text-base leading-7 text-muted-foreground">
                  Known in the catalog for {author.genres.slice(0, 2).join(", ").toLowerCase()}{" "}
                  titles, with {author.latestTitle} as the latest featured book.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{compactNumber(author.followers)}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{author.titles}</span>
                    <span className="text-muted-foreground">books</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2.5 rounded-full bg-primary/5 px-4 py-2 text-sm text-muted-foreground">
                  <Medal className="h-5 w-5 text-amber-500" />
                  <span className="font-semibold text-foreground">
                    {author.borrowCount.toLocaleString()}
                  </span>
                  <span>borrows across the catalog</span>
                </div>

                <Button
                  variant="outline"
                  className="mt-6 w-full rounded-full bg-background shadow-sm"
                >
                  Follow
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
