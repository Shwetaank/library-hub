import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCatalogPageData } from "@/lib/discovery";

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

type SearchParams = Promise<{ q?: string; genre?: string }>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const data = await getCatalogPageData({
    query: params.q,
    genre: params.genre,
  });

  return (
    <div className="page-surface">
      <section className="px-6 pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/92 shadow-[0_18px_80px_-42px_rgba(15,23,42,0.16)]">
            <div className="border-b border-border/70 px-5 py-6 sm:px-8">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Discover and explore thousands of books
              </h1>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Search by title, author, genre, or keyword.
              </p>
            </div>

            <div className="space-y-5 px-5 py-6 sm:px-8">
              <form action="/catalog" className="relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  name="q"
                  defaultValue={data.activeQuery}
                  placeholder="Search by title, author, or keyword..."
                  className="h-14 w-full rounded-[1.4rem] border border-border/70 bg-background px-14 text-sm outline-none transition focus:border-primary/35 focus:ring-4 focus:ring-primary/10"
                />
                {data.activeGenre !== "All" ? (
                  <input type="hidden" name="genre" value={data.activeGenre} />
                ) : null}
              </form>

              <div className="overflow-x-auto">
                <div className="flex min-w-max gap-3">
                  {["All", ...data.genres].map((genre) => {
                    const active = genre === data.activeGenre;
                    const href =
                      genre === "All"
                        ? data.activeQuery
                          ? `/catalog?q=${encodeURIComponent(data.activeQuery)}`
                          : "/catalog"
                        : `/catalog?genre=${encodeURIComponent(genre)}${
                            data.activeQuery ? `&q=${encodeURIComponent(data.activeQuery)}` : ""
                          }`;

                    return (
                      <Link
                        key={genre}
                        href={href}
                        className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/70 bg-background text-foreground hover:border-primary/25 hover:text-primary"
                        }`}
                      >
                        {genre}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-muted/25 px-5 py-6 sm:px-8">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{data.books.length}</span> books
                found
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {data.books.map((book) => (
                  <article
                    key={book.id}
                    className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-60">
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

                      <div>
                        <div className="flex items-center gap-1">{renderStars(book.rating)}</div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          ({book.reviews} reviews)
                        </p>
                      </div>

                      <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                        {book.available > 0 ? `${book.available} Available` : "Waitlist"}
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
