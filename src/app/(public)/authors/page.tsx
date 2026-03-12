import { BookOpen, Medal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <section className="px-6 pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/92 shadow-[0_18px_80px_-42px_rgba(15,23,42,0.16)]">
            <div className="bg-linear-to-r from-primary/6 via-background to-secondary/8 px-5 py-8 sm:px-8">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Discover Authors
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                Follow the writers behind the catalog and keep track of the names readers return to
                most.
              </p>
            </div>

            <div className="px-5 py-8 sm:px-8">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.authors.map((author) => (
                  <article
                    key={author.name}
                    className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-56 items-center justify-center bg-linear-to-br from-primary/12 via-primary/6 to-secondary/10">
                      <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-primary/15 bg-background/70 text-3xl font-semibold text-primary shadow-sm">
                        {initials(author.name)}
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <h2 className="text-[1.9rem] font-semibold tracking-tight text-foreground">
                          {author.name}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">{author.yearsActive}</p>
                      </div>

                      <p className="line-clamp-2 text-sm leading-7 text-muted-foreground">
                        Known in the catalog for {author.genres.slice(0, 2).join(", ").toLowerCase()}{" "}
                        titles, with {author.latestTitle} as the latest featured book.
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-foreground">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{compactNumber(author.followers)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{author.titles} books</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Medal className="h-4 w-4 text-amber-500" />
                        <span>{author.borrowCount} borrows across the catalog</span>
                      </div>

                      <Button variant="outline" className="w-full rounded-full bg-background">
                        Follow
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
