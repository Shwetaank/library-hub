"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelsTopLeft,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { ROLES, type AppRole } from "@/constants/roles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

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

  const sideItems = useMemo<SideItem[]>(() => {
    if (role === ROLES.ADMIN) {
      return [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/admin", label: "Admin Panel", icon: PanelsTopLeft },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    }

    return [
      { href: "/dashboard", label: "My Books", icon: LayoutDashboard },
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

  const sidebar = (
    <div className="glass-panel flex h-full flex-col rounded-[2rem] p-4">
      <div className="border-b border-border/60 px-4 py-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary/15 to-secondary/15 text-2xl text-primary">
          {role === ROLES.ADMIN ? "A" : "U"}
        </div>
        <div className="mt-5">
          <div className="text-3xl font-semibold tracking-tight">{user?.name ?? "LibraryHub"}</div>
          <div className="mt-1 text-base text-muted-foreground">{user?.email ?? "workspace@libraryhub.com"}</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-5">
        <div className="space-y-1">
          {sideItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.href.includes("#") && pathname === item.href.split("#")[0]);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-base transition",
                  active
                    ? "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_16px_40px_-22px_rgba(79,70,229,0.45)]"
                    : "text-foreground hover:bg-background/75",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-2 pb-2">
        <Button
          variant="outline"
          className="h-12 w-full justify-center rounded-2xl border-border/60 bg-background/80 text-base"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="page-surface min-h-[calc(100vh-88px)]">
      <div className="mx-auto grid max-w-[1600px] gap-4 px-4 pb-8 pt-4 sm:gap-6 sm:px-6 sm:pt-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <div className="flex items-center justify-between lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-border/60 bg-background/80"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "..." : "Sign Out"}
          </Button>
        </div>

        <aside className="hidden lg:block">{sidebar}</aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            />
            <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-background p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div className="text-lg font-semibold">Workspace</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-4">{sidebar}</div>
            </div>
          </div>
        ) : null}

        <main className="min-w-0">
          <div className="hero-shell mb-5 px-5 py-6 sm:mb-6 sm:px-8 sm:py-10">
            <div className="relative z-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {role === ROLES.ADMIN ? "Admin Workspace" : "Member Workspace"}
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {heading}
              </div>
              <div className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {subheading}
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
