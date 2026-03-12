import Image from "next/image";
import Link from "next/link";
import { Medal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBestsellersPageData } from "@/lib/discovery";

export const revalidate = 300;

function renderStars(rating: number) {
  const filled = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${index < filled ? "fill-amber-400 text-amber-400" : "text-zinc-300"}`}
    />
  ));
}

export default async function BestsellersPage() {
  const data = await getBestsellersPageData();

  return (
    <div className="page-surface">
      <section className="px-6 pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/92 shadow-[0_18px_80px_-42px_rgba(15,23,42,0.16)]">
            <div className="px-5 py-12 text-center sm:px-8">
              <div className="inline-flex items-center gap-3 text-primary">
                <Medal className="h-8 w-8" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.28em]">
                  Reader ranking
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Bestsellers
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Most popular and highly-rated books on LibraryHub.
              </p>
            </div>

            <div className="bg-muted/25 px-5 py-8 sm:px-8">
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {data.ranked.slice(0, 8).map((book) => (
                  <article
                    key={book.id}
                    className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-64">
                      <Image
                        src={book.coverSrc}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <h2 className="text-[1.35rem] font-semibold tracking-tight text-foreground">
                          {book.title}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">{renderStars(book.rating)}</div>
                        <span className="text-sm text-muted-foreground">{book.rating}</span>
                      </div>

                      <Button asChild className="w-full rounded-full btn-brand">
                        <Link href={`/catalog/${book.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
