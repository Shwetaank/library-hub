import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCatalogBookDetail } from "@/lib/discovery";

export const revalidate = 300;

function renderStars(rating: number) {
  const filled = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-5 w-5 ${index < filled ? "fill-amber-400 text-amber-400" : "text-zinc-300"}`}
    />
  ));
}

export default async function CatalogBookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getCatalogBookDetail(Number(id));

  if (!book) {
    notFound();
  }

  const progress = Math.max(8, Math.round((book.available / book.totalCopies) * 100));

  return (
    <div className="page-surface">
      <section className="px-6 pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link href="/catalog" className="text-sm font-medium text-foreground hover:text-primary">
              ← Back to Catalog
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[440px_1fr]">
            <div className="overflow-hidden rounded-[1.8rem] border border-border/70 bg-background shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={book.coverSrc}
                  alt={book.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-border/70 p-4">
                <Button variant="outline" className="w-full rounded-full bg-background">
                  <Heart className="h-4 w-4" />
                  Add to Favorites
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {book.title}
                </h1>
                <p className="mt-3 text-2xl text-muted-foreground">{book.author}</p>
              </div>

              <div className="grid gap-4 rounded-[1.8rem] border border-border/70 bg-background p-6 sm:grid-cols-2 shadow-sm">
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p className="mt-2 text-2xl font-semibold">{book.genre}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ISBN</p>
                  <p className="mt-2 text-2xl font-semibold">{`978-0-${book.id.toString().padStart(3, "0")}-LIB`}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pages</p>
                  <p className="mt-2 text-2xl font-semibold">{180 + book.description.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="mt-2 text-2xl font-semibold">{book.createdAt.getFullYear()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">{renderStars(book.rating)}</div>
                <span className="text-4xl font-semibold">{book.rating}</span>
                <span className="text-xl text-muted-foreground">({book.reviews} reviews)</span>
              </div>

              <div className="rounded-[1.8rem] border border-border/70 bg-background p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Availability</h2>
                    <p className="mt-3 text-xl text-muted-foreground">Copies available:</p>
                  </div>
                  <p className="text-4xl font-semibold text-emerald-600">
                    {book.available} of {book.totalCopies}
                  </p>
                </div>
                <div className="mt-5 h-3 rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-linear-to-r from-primary to-secondary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Description</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {book.description}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Reader Reviews</h2>
                <div className="mt-5 rounded-[1.8rem] border border-border/70 bg-background p-6 shadow-sm">
                  {book.borrows.length > 0 ? (
                    <div className="space-y-4">
                      {book.borrows.map((borrow) => (
                        <div key={`${borrow.user.name}-${borrow.borrowedAt.toISOString()}`}>
                          <p className="font-medium">{borrow.user.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {borrow.returned ? "Returned copy" : "Currently borrowing"} ·{" "}
                            {borrow.borrowedAt.toLocaleDateString("en-US")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-muted-foreground">
                      No reviews yet. Be the first to review this book!
                    </p>
                  )}
                </div>
              </div>

              {book.related.length > 0 ? (
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">Related Titles</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {book.related.map((item) => (
                      <Link
                        key={item.id}
                        href={`/catalog/${item.id}`}
                        className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative h-44">
                          <Image
                            src={item.coverSrc}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1280px) 50vw, 240px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{item.author}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
