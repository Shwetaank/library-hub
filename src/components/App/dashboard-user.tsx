import {
  ArrowUpRight,
  BookOpenText,
  Clock3,
  Heart,
  LibraryBig,
  TimerReset,
} from "lucide-react";
import { ListItem, SectionHeader, Surface } from "@/components/App/workspace-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";

type UserDashboardData = NonNullable<
  Awaited<ReturnType<typeof import("@/lib/dashboard").getUserDashboardData>>
>;

function MetricDeck({
  title,
  value,
  meta,
  icon,
  accentClass,
}: {
  title: string;
  value: string;
  meta: string;
  icon: React.ReactNode;
  accentClass: string;
}) {
  return (
    <CardContainer containerClassName="py-0">
      <CardBody className="glass-panel mesh-card rounded-[1.7rem] border-border/60 p-4 sm:p-5">
        <CardItem translateZ={22} className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              {value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{meta}</div>
          </div>
          <div className={`rounded-2xl p-3 ${accentClass}`}>{icon}</div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

function FavoriteCard({
  title,
  author,
  genre,
  availability,
}: {
  title: string;
  author: string;
  genre: string;
  availability: string;
}) {
  return (
    <div className="ui-card-elevated rounded-[1.6rem] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{author}</div>
        </div>
        <div className="rounded-full bg-muted p-2 text-muted-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
          {genre}
        </span>
        <span className="text-sm font-medium text-foreground">{availability}</span>
      </div>
    </div>
  );
}

export function UserDashboard({ data }: { data: UserDashboardData }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Surface className="overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Reader Overview
                </div>
                <div className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
                  My Library
                </div>
                <div className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  Track active borrowing, reading history, and saved titles from one workspace.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm">
                  <div className="text-muted-foreground">Member</div>
                  <div className="mt-1 font-medium">{data.user.name}</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm">
                  <div className="text-muted-foreground">Completed</div>
                  <div className="mt-1 font-medium">{data.hero.completedReads}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <MetricDeck
                title="Borrowed"
                value={String(data.hero.activeBorrows)}
                meta="Currently issued"
                icon={<LibraryBig className="h-7 w-7 text-primary" />}
                accentClass="bg-primary/10 text-primary"
              />
              <MetricDeck
                title="History"
                value={String(data.hero.completedReads)}
                meta="Completed reads"
                icon={<BookOpenText className="h-7 w-7 text-secondary" />}
                accentClass="bg-secondary/15 text-secondary"
              />
              <MetricDeck
                title="Overdue"
                value={String(data.hero.overdueCount)}
                meta="Needs attention"
                icon={<TimerReset className="h-7 w-7 text-destructive" />}
                accentClass="bg-destructive/10 text-destructive"
              />
            </div>
          </div>
        </Surface>

        <Surface>
          <SectionHeader title="Snapshot" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="ui-card-elevated rounded-[1.45rem] p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                Favorites
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{data.hero.favorites}</div>
            </div>
            <div className="ui-card-elevated rounded-[1.45rem] p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                Due Soon
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{data.activeBorrows.length}</div>
            </div>
            <div className="ui-card-elevated rounded-[1.45rem] p-4 sm:col-span-2">
              <div className="text-sm text-muted-foreground">Account</div>
              <div className="mt-2 text-lg font-medium">{data.user.email}</div>
            </div>
          </div>
        </Surface>
      </section>

      <Surface id="favorites">
        <Tabs defaultValue="borrowed" className="space-y-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <SectionHeader title="Reading Activity" />
            <div className="overflow-x-auto pb-1">
              <TabsList className="inline-grid h-auto min-w-max grid-cols-3 rounded-2xl bg-muted/60 p-1">
              <TabsTrigger value="borrowed" className="rounded-xl px-4 py-2.5 sm:px-5">
                Borrowed ({data.activeBorrows.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl px-4 py-2.5 sm:px-5">
                History ({data.timeline.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-xl px-4 py-2.5 sm:px-5">
                Favorites ({data.favorites.length})
              </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="borrowed">
            <div className="space-y-3">
              {data.activeBorrows.length === 0 ? (
                <div className="rounded-[1.7rem] border border-dashed border-border/80 p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <LibraryBig className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-lg font-medium">No borrowed books yet</div>
                  <div className="mt-2 text-muted-foreground">
                    Start browsing the catalog to build your reading queue.
                  </div>
                  <Button className="btn-brand mt-6 h-12 rounded-xl px-6 sm:px-8">Browse Catalog</Button>
                </div>
              ) : (
                data.activeBorrows.map((borrow) => (
                  <ListItem
                    key={borrow.id}
                    title={borrow.title}
                    description={`${borrow.author} - ${borrow.genre}`}
                    meta={borrow.dueLabel}
                    badge={
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          borrow.status === "Overdue"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {borrow.status}
                      </span>
                    }
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-3">
              {data.timeline.map((entry) => (
                <ListItem
                  key={entry.id}
                  title={entry.title}
                  description={`${entry.author} - ${entry.genre}`}
                  meta={entry.borrowedAt.toLocaleDateString()}
                  badge={
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {entry.returned ? "Returned" : "Checked out"}
                    </span>
                  }
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.favorites.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-border/80 p-8 text-muted-foreground">
                  No favorites yet
                </div>
              ) : (
                data.favorites.map((favorite) => (
                  <FavoriteCard
                    key={favorite.id}
                    title={favorite.title}
                    author={favorite.author}
                    genre={favorite.genre}
                    availability={
                      favorite.available > 0
                        ? `${favorite.available} available`
                        : "Unavailable"
                    }
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Surface>
    </div>
  );
}
