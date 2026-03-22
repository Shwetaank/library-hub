import {
  AlertTriangle,
  BookCopy,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ListItem, SectionHeader, Surface } from "@/components/App/workspace-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type AdminDashboardData = Awaited<
  ReturnType<typeof import("@/lib/dashboard").getAdminDashboardData>
>;

function AdminMetric({
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
    <CardContainer containerClassName="py-0 h-full">
      <CardBody className="h-full rounded-[1.7rem] border border-border/70 bg-card/80 p-4 shadow-sm sm:p-5">
        <CardItem translateZ={22} className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className={`rounded-xl p-2.5 ${accentClass}`}>{icon}</div>
          </div>
          <div>
            <div className="text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
              {value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{meta}</div>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

function InventoryCard({
  title,
  author,
  genre,
  inventory,
}: {
  title: string;
  author: string;
  genre: string;
  inventory: string;
}) {
  return (
    <div className="rounded-[1.6rem] border border-border/70 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="text-lg font-semibold tracking-tight">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{author}</div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          {genre}
        </span>
        <span className="text-sm font-medium">{inventory}</span>
      </div>
    </div>
  );
}

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-3">
            <AdminMetric
              title="Catalog"
              value={String(data.overview.totalBooks)}
              meta="Library titles"
              icon={<BookCopy className="h-6 w-6" />}
              accentClass="bg-primary/10 text-primary"
            />
            <AdminMetric
              title="Members"
              value={String(data.overview.totalUsers - data.overview.totalAdmins)}
              meta="Active readers"
              icon={<Users className="h-6 w-6" />}
              accentClass="bg-emerald-500/10 text-emerald-600"
            />
            <AdminMetric
              title="Overdue"
              value={String(data.overview.overdueBorrows)}
              meta="Needs follow-up"
              icon={<AlertTriangle className="h-6 w-6" />}
              accentClass="bg-destructive/10 text-destructive"
            />
          </div>
          <Surface>
            <SectionHeader title="Live Circulation" />
            <div className="mt-5 space-y-3">
              {data.activeBorrows.map((borrow) => (
                <ListItem
                  key={borrow.id}
                  title={borrow.title}
                  description={`${borrow.member} - ${borrow.email}`}
                  meta={`${borrow.author} - ${borrow.genre} - ${borrow.dueDate.toLocaleDateString()}`}
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
              ))}
            </div>
          </Surface>
        </div>

        <Surface>
          <SectionHeader title="Quick Stats" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.45rem] border border-border/70 bg-card/80 p-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Admins
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{data.overview.totalAdmins}</div>
            </div>
            <div className="rounded-[1.45rem] border border-border/70 bg-card/80 p-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                Requests
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{data.overview.totalContacts}</div>
            </div>
            <div className="rounded-[1.45rem] border border-border/70 bg-card/80 p-4 shadow-sm sm:col-span-2">
              <div className="text-sm text-muted-foreground">Live Borrows</div>
              <div className="mt-2 text-lg font-medium">{data.overview.liveBorrows} active loans</div>
            </div>
          </div>
        </Surface>
      </section>

      <Surface>
        <Tabs defaultValue="inventory" className="space-y-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <SectionHeader title="Operations" />
            <div className="overflow-x-auto pb-1">
              <TabsList className="inline-grid h-auto min-w-max grid-cols-3 rounded-2xl bg-muted/60 p-1.5">
                <TabsTrigger value="inventory" className="rounded-xl px-4 py-2 sm:px-5">
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="members" className="rounded-xl px-4 py-2 sm:px-5">
                  Members
                </TabsTrigger>
                <TabsTrigger value="requests" className="rounded-xl px-4 py-2 sm:px-5">
                  Requests
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="inventory">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.lowStockBooks.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-border/80 p-6 text-center text-muted-foreground sm:p-8">
                  No low-stock titles
                </div>
              ) : (
                data.lowStockBooks.map((book) => (
                  <InventoryCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    inventory={`${book.available} / ${book.totalCopies} available`}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="space-y-3">
              {data.recentMembers.map((member) => (
                <ListItem
                  key={member.id}
                  title={member.name}
                  description={member.email}
                  meta={member.createdAt.toLocaleDateString()}
                  badge={
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {member.role}
                    </span>
                  }
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-3">
              {data.contactRequests.map((request) => (
                <ListItem
                  key={request.id}
                  title={request.name}
                  description={`${request.email} - ${request.organization}`}
                  meta={request.message}
                  badge={
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {request.createdAt.toLocaleDateString()}
                    </span>
                  }
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Surface>
    </div>
  );
}
