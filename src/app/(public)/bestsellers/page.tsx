import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBestsellersPageData } from "@/lib/discovery";
import { cn } from "@/lib/utils";

export const revalidate = 300;

function renderStars(rating: number, className?: string) {
  const filled = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={cn(
        "h-4 w-4",
        index < filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
        className,
      )}
    />
  ));
}

export default async function BestsellersPage() {
  const data = await getBestsellersPageData();

  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Reader Ranking
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Bestselling titles, surfaced like a real SaaS leaderboard.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  Review top-performing books by popularity, rating, and discovery momentum across
                  the LibraryHub catalog.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Ranked titles", value: String(data.ranked.length) },
                  { label: "Top list", value: "Reader-led" },
                  { label: "Signal mix", value: "Rating + demand" },
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
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {data.ranked.slice(0, 12).map((book) => (
              <article
                key={book.id}
                className="group overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:!border-primary/40 hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={book.coverSrc}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                  />
                   <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1">{renderStars(book.rating, "text-white/90 h-5 w-5")}</div>
                        <p className="mt-1.5 text-sm text-white/80">
                          ({book.reviews} reviews)
                        </p>
                      </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {book.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      {book.available > 0 ? `${book.available} Available` : "Waitlist"}
                    </div>
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
