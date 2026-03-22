import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { BookActions } from "@/components/Books/book-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCatalogBookDetail } from "@/lib/discovery";
import { cn } from "@/lib/utils";

export const revalidate = 300;

function renderStars(rating: number, className?: string) {
  const filled = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={cn(
        "h-5 w-5",
        index < filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30",
        className,
      )}
    />
  ));
}

export default async function CatalogBookDetailPage({
  params,
}: {
  params: Promise<{ id:string }>;
}) {
  const { id } = await params;
  const book = await getCatalogBookDetail(Number(id));

  if (!book) {
    notFound();
  }

  const progress = Math.max(8, Math.round((book.available / book.totalCopies) * 100));

  return (
    <div className="page-surface">
      <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8">
            <Button asChild variant="outline" className="rounded-full bg-card/90 px-6 shadow-sm">
              <Link href="/catalog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalog
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[460px_1fr]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={book.coverSrc}
                    alt={book.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-border/70 p-4">
                  <BookActions bookId={book.id} initialAvailable={book.available} />
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Availability</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Copies available:</p>
                  </div>
                  <p className="text-4xl font-semibold text-primary">
                    {book.available} / {book.totalCopies}
                  </p>
                </div>
                <div className="mt-5 h-3 rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                  {book.title}
                </h1>
                <p className="text-2xl text-muted-foreground">{book.author}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {renderStars(book.rating, "h-6 w-6")}
                  </div>
                  <span className="text-3xl font-semibold">{book.rating.toFixed(1)}</span>
                  <span className="text-lg text-muted-foreground">({book.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid gap-4 rounded-[1.8rem] border border-border/70 bg-card p-6 sm:grid-cols-2 shadow-sm">
                <div>
                  <p className="text-base text-muted-foreground">Genre</p>
                  <p className="mt-2 text-2xl font-semibold">{book.genre}</p>
                </div>
                <div>
                  <p className="text-base text-muted-foreground">ISBN</p>
                  <p className="mt-2 text-2xl font-semibold">{`978-0-${book.id
                    .toString()
                    .padStart(3, "0")}-LIB`}</p>
                </div>
                <div>
                  <p className="text-base text-muted-foreground">Pages</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {180 + book.description.length}
                  </p>
                </div>
                <div>
                  <p className="text-base text-muted-foreground">Published</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {book.createdAt.getFullYear()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">Description</h2>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {book.description}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">Reader Reviews</h2>
                <div className="rounded-[1.8rem] border border-border/70 bg-card p-6 shadow-sm">
                  {book.borrows.length > 0 ? (
                    <div className="space-y-6">
                      {book.borrows.map((borrow) => (
                        <div key={`${borrow.user.name}-${borrow.borrowedAt.toISOString()}`} className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={borrow.user.avatar ?? undefined} alt={borrow.user.name} />
                            <AvatarFallback>{borrow.user.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{borrow.user.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {borrow.returned ? "Returned copy" : "Currently borrowing"} ·{" "}
                              {borrow.borrowedAt.toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}
                            </p>
                          </div>
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
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">Related Titles</h2>
                  <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                    {book.related.map((item) => (
                      <Link
                        key={item.id}
                        href={`/catalog/${item.id}`}
                        className="group overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={item.coverSrc}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1280px) 50vw, 240px"
                            className="object-cover transition-transform group-hover:scale-105"
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
