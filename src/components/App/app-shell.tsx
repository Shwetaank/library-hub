"use client";

"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BookCopy,
  ChartNoAxesColumn,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelsTopLeft,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROLES, type AppRole } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AppShellProps = {
  role: AppRole;
  heading: string;
  subheading: string;
  children: React.ReactNode;
};

type SideItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export function AppShell({ role, heading, subheading, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const sideItems = useMemo<SideItem[]>(() => {
    if (role === ROLES.ADMIN) {
      return [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard#catalog-manager", label: "Catalog", icon: BookCopy },
        { href: "/admin", label: "Operations", icon: PanelsTopLeft },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    }

    return [
      { href: "/dashboard", label: "Workspace", icon: LayoutDashboard },
      { href: "/dashboard#favorites", label: "Favorites", icon: Heart },
      { href: "/settings", label: "Profile", icon: UserRound },
    ];
  }, [role]);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut();
      router.push("/");
    } finally {
      setLoggingOut(false);
    }
  }

  const initials = useMemo(
    () =>
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2) ?? "U",
    [user],
  );

  const sidebar = (
    <div className="flex h-full flex-col rounded-[1.8rem] border border-border/70 bg-card p-4 shadow-sm">
      <div className="rounded-[1.4rem] bg-muted/50 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 text-lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-semibold tracking-[-0.04em]">{user?.name ?? "LibraryHub"}</div>
            <div className="mt-1 truncate text-sm text-muted-foreground">
              {user?.email ?? "workspace@libraryhub.com"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Workspace
      </div>
      <nav className="mt-3 flex-1 space-y-1.5 p-1">
        {sideItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href.includes("#") && pathname === item.href.split("#")[0]);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button
        variant="outline"
        className="mt-4 h-12 justify-start gap-3 rounded-xl border-border/70 bg-card px-4 text-base text-foreground/80 hover:bg-muted/80 hover:text-foreground"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        <LogOut className="h-5 w-5" />
        {loggingOut ? "Signing Out..." : "Sign Out"}
      </Button>
    </div>
  );

  return (
    <div className="page-surface min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <Button variant="outline" size="icon" className="rounded-2xl" onClick={() => setMobileOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="rounded-2xl" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "..." : "Sign Out"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="hidden lg:block">{sidebar}</aside>

          {mobileOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
              />
              <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm p-4">
                <div className="mb-3 flex items-center justify-between rounded-[1.4rem] border border-border/70 bg-card/95 px-4 py-2 backdrop-blur-xl">
                  <div className="text-sm font-semibold">Workspace</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-2xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {sidebar}
              </div>
            </div>
          )}

          <main className="min-w-0">
            <section className="hero-shell rounded-[2rem] px-6 py-8 sm:px-8">
              <div className="relative z-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-widest text-primary">
                      {role === ROLES.ADMIN ? "Admin workspace" : "Member workspace"}
                    </div>
                    <h1 className="hero-title mt-3 !text-4xl sm:!text-5xl">{heading}</h1>
                    <p className="hero-copy mt-4 !max-w-3xl !text-base sm:!text-lg">
                      {subheading}
                    </p>
                  </div>
                  <div className="grid shrink-0 gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                    <div className="metric-tile rounded-[1.4rem]">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <ChartNoAxesColumn className="h-4 w-4 text-primary" />
                        Focus
                      </div>
                      <div className="mt-3 text-base font-semibold">
                        {role === ROLES.ADMIN ? "Ops control" : "Reading flow"}
                      </div>
                    </div>
                    <div className="metric-tile rounded-[1.4rem]">
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div className="mt-3 text-base font-semibold">Workspace live</div>
                    </div>
                    <div className="metric-tile rounded-[1.4rem] sm:col-span-3 lg:col-span-1">
                      <div className="text-sm font-medium text-muted-foreground">Account</div>
                      <div className="mt-3 truncate text-base font-semibold">
                        {user?.email ?? "workspace@libraryhub.com"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
