import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  {
    title: "Operational clarity",
    description:
      "Every screen is shaped around what staff and readers need to do next, not around generic dashboard decoration.",
    icon: Layers3,
  },
  {
    title: "Reliable circulation",
    description:
      "Borrowing, returns, due tracking, and catalog state stay connected so teams can move faster with less checking.",
    icon: BookOpenCheck,
  },
  {
    title: "Institution-ready governance",
    description:
      "Role-aware access, structured data flows, and admin visibility make the product easier to trust at scale.",
    icon: ShieldCheck,
  },
  {
    title: "Member-first experience",
    description:
      "Readers get a cleaner personal workspace for discovery, favorites, history, and account updates.",
    icon: Users,
  },
];

const operatingAreas = [
  "Catalog management with cover assets and inventory tracking",
  "Reader dashboard for loans, favorites, and history",
  "Admin workspace for requests, circulation, and stock pressure",
  "Public discovery flow that feels closer to a product website than a student demo",
];

export default function AboutPage() {
  return (
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell grid gap-8 rounded-[2.25rem] px-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-12">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                About the platform
              </div>
              <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                LibraryHub is being shaped like a real SaaS product for modern library operations.
              </h1>
              <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                The goal is simple: replace scattered library workflows with one calm, coherent
                operating surface for discovery, circulation, reader management, and admin control.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-2xl bg-primary px-7 text-primary-foreground hover:bg-primary/92">
                  <Link href="/register">
                    Start free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl bg-card/90 px-7 shadow-sm">
                  <Link href="/dashboard">View workspace</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="ui-card-elevated rounded-[1.8rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold">Product thesis</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Run circulation, catalog, and member workflows in one system.
                    </div>
                  </div>
                  <div className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                    Live
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {operatingAreas.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.3rem] border border-border/70 bg-background/70 px-4 py-3.5 text-sm leading-7 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="ui-card-elevated rounded-[1.8rem] border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <Building2 className="h-5 w-5 text-primary" />
                  What this project is becoming
                </div>
                <div className="mt-4 text-2xl font-semibold tracking-[-0.05em]">
                  Less academic prototype, more institution-ready product.
                </div>
                <div className="mt-3 text-base leading-7 text-muted-foreground">
                  The redesign focuses on stronger hierarchy, cleaner product language, and a more
                  credible SaaS-style interface across public pages and logged-in workspaces.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-3xl text-center mx-auto">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">
              Principles
            </div>
            <h2 className="section-title mt-4">The product is designed around real library work.</h2>
            <p className="section-copy mt-5 !text-lg">
              Instead of treating library management as a collection of disconnected pages,
              LibraryHub brings product structure, consistent hierarchy, and clearer operational
              feedback to the full experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-border/70 bg-card px-9 py-9 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-primary/8 text-primary">
                    <Icon className="h-8 w-8 stroke-[1.7]" />
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold tracking-[-0.05em]">
                    {item.title}
                  </h3>
                  <p className="mt-7 text-lg leading-9 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-[2.25rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_24%),color-mix(in_oklch,var(--color-card)_92%,transparent)] px-8 py-10 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/80">
                  Ready to get started?
                </div>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                  Bring your library into a cleaner digital experience.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-9 text-muted-foreground">
                  Launch discovery, borrowing, reader profiles, and modern catalog browsing from
                  one polished platform.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-self-end">
                <Button asChild size="lg" className="rounded-2xl bg-primary px-7 text-primary-foreground hover:bg-primary/92">
                  <Link href="/register">Create Free Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl bg-card/80 px-7 shadow-sm">
                  <Link href="/catalog">Browse Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
