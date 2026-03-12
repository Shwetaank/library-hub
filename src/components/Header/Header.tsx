"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  Bell,
  LogIn,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Shield,
  ChevronRight,
  LibraryBig,
  Users,
  Trophy,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const navItems = useMemo<NavItem[]>(() => {
    const base: NavItem[] = [
      {
        label: "Catalog",
        href: "/catalog",
        description: "Search and browse the full collection",
        icon: LibraryBig,
      },
      {
        label: "Authors",
        href: "/authors",
        description: "Discover writers and curated profiles",
        icon: Users,
      },
      {
        label: "Clubs",
        href: "/clubs",
        description: "Join reading groups and shared lists",
        icon: BookOpen,
      },
      {
        label: "Bestsellers",
        href: "/bestsellers",
        description: "Track trending picks and popular titles",
        icon: Trophy,
      },
    ];

    if (user?.role === "ADMIN") {
      base.push({
        label: "Admin",
        href: "/admin",
        description: "Manage platform controls and access",
        icon: LayoutDashboard,
      });
    }

    return base;
  }, [user?.role]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname],
  );

  // Add a subtle elevation when the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer automatically on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Allow Esc to close the mobile drawer for keyboard users.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleLogout = useCallback(async () => {
    try {
      setLoggingOut(true);
      await signOut();
    } finally {
      setLoggingOut(false);
    }
  }, [signOut]);

  const isDarkTheme = resolvedTheme === "dark";

  const toggleTheme = useCallback(
    () => setTheme(isDarkTheme ? "light" : "dark"),
    [isDarkTheme, setTheme],
  );

  const themeToggleLabel = isDarkTheme
    ? "Switch to light mode"
    : "Switch to dark mode";

  const initials = useMemo(
    () =>
      user?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("") ?? "U",
    [user?.name],
  );

  // Prevent hydration mismatch from theme-dependent UI until mounted.
  if (!mounted) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/78 shadow-[0_18px_50px_-30px_rgba(79,70,229,0.22)] backdrop-blur-2xl"
            : "bg-background/50 backdrop-blur-xl"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative py-3">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />
            <div
              className={`grid items-center rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(79,70,229,0.08),rgba(255,255,255,0.92),rgba(245,158,11,0.08))] px-4 shadow-[0_8px_30px_-22px_rgba(79,70,229,0.3)] backdrop-blur-2xl transition-all duration-300 grid-cols-[1fr_auto_auto] gap-2 dark:bg-[linear-gradient(135deg,rgba(129,140,248,0.12),rgba(15,23,42,0.94),rgba(245,158,11,0.08))] md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] ${
                scrolled ? "min-h-[76px]" : "min-h-[82px]"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Link href="/" className="group flex items-center gap-3 py-3">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 320, damping: 16 }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 via-primary/10 to-secondary/20 text-primary transition group-hover:border-secondary/35"
                  >
                    <div className="absolute inset-1 rounded-[1rem] bg-background/70" />
                    <BookOpen className="relative h-5 w-5" />
                  </motion.div>

                  <div className="min-w-0">
                    <motion.span
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="accent-text block text-lg font-semibold leading-none sm:text-xl"
                    >
                      LibraryHub
                    </motion.span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Modern library operations
                    </span>
                  </div>
                </Link>
              </motion.div>

            <motion.nav
              className="hidden lg:flex items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                },
              }}
            >
              <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-background/75 p-1 shadow-inner shadow-primary/5">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: -8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-linear-to-r from-primary/14 to-secondary/14 text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-primary/6 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                        {active ? (
                          <motion.span
                            layoutId="desktop-active-link"
                            className="absolute inset-0 rounded-full ring-1 ring-primary/20"
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 34,
                            }}
                          />
                        ) : null}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>

            <div className="hidden md:flex items-center justify-end gap-3 py-3">
              <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-background/75 p-1.5 shadow-sm shadow-primary/5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={themeToggleLabel}
                  title={themeToggleLabel}
                  className="relative h-10 w-10 rounded-full"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isDarkTheme ? "sun" : "moon"}
                      initial={{ opacity: 0, rotate: -40, scale: 0.75 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 40, scale: 0.75 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      {isDarkTheme ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </Button>

                {isAuthenticated && user ? (
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <Bell className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>

              {isAuthenticated && user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-3 rounded-full border border-primary/10 bg-background/80 py-1.5 pl-1.5 pr-4 shadow-sm shadow-primary/5 transition hover:border-secondary/25 hover:bg-background">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full ring-2 ring-primary/15"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary/15 to-secondary/15 text-xs font-semibold text-primary">
                            {initials}
                          </div>
                        )}
                        <div className="text-left">
                          <span className="block max-w-32 truncate text-sm font-medium">
                            {user.name}
                          </span>
                          <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            {user.role === "ADMIN" ? "Administrator" : "Member"}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-secondary" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-2xl border border-primary/10 bg-background/90 p-2 backdrop-blur-xl"
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="rounded-xl">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="rounded-xl">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="rounded-xl text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full border-primary/10 bg-background/80 px-5"
                  >
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full bg-linear-to-r from-primary to-secondary px-5 text-primary-foreground shadow-[0_16px_40px_-22px_rgba(79,70,229,0.5)]"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

              <div className="flex items-center justify-end gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={themeToggleLabel}
                  title={themeToggleLabel}
                  className="h-11 w-11 rounded-2xl border border-primary/10 bg-background/80 shadow-sm shadow-primary/5"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isDarkTheme ? "mobile-sun" : "mobile-moon"}
                      initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      {isDarkTheme ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </Button>

                <button
                  onClick={openMobile}
                  aria-label="Open navigation menu"
                  className="rounded-2xl border border-primary/10 bg-background/80 p-3 shadow-sm shadow-primary/5 transition hover:border-secondary/25 hover:bg-background"
                >
                  <Menu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-background/55 backdrop-blur-sm"
              onClick={closeMobile}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-sm flex-col border-l border-primary/10 bg-[linear-gradient(180deg,rgba(79,70,229,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94)),radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_28%)] shadow-2xl shadow-primary/15 backdrop-blur-2xl dark:bg-[linear-gradient(180deg,rgba(129,140,248,0.14),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(15,23,42,0.96)),radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_28%)]"
            >
              <div className="border-b border-primary/10 px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Navigation
                    </span>
                    <span className="mt-1 block text-lg font-semibold">
                      LibraryHub
                    </span>
                  </div>
                  <button
                    onClick={closeMobile}
                    aria-label="Close navigation menu"
                    className="rounded-2xl border border-primary/10 bg-background/80 p-3 transition hover:border-secondary/25 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-[1.6rem] border border-primary/10 bg-background/80 p-4 shadow-sm shadow-primary/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/18 to-secondary/18 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {isAuthenticated && user ? (
                        <>
                          <p className="truncate text-sm font-semibold">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold">Welcome to LibraryHub</p>
                          <p className="text-xs text-muted-foreground">
                            Library operations, member management, and discovery in one place.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full rounded-full border-primary/10 bg-background/80"
                      >
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>

              <motion.div
                className="flex-1 overflow-y-auto px-5 py-5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06 },
                  },
                }}
              >
                <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Explore
                </div>
                <div className="space-y-3">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-center gap-3 rounded-[1.4rem] border px-4 py-4 transition ${
                            active
                              ? "border-primary/25 bg-[linear-gradient(135deg,rgba(79,70,229,0.12),rgba(245,158,11,0.08))] shadow-[0_16px_40px_-30px_rgba(79,70,229,0.45)]"
                              : "border-primary/10 bg-background/75 hover:border-secondary/20 hover:bg-background"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/80 text-muted-foreground group-hover:text-primary"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold">{item.label}</div>
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 shrink-0 transition ${
                              active
                                ? "text-primary"
                                : "text-secondary group-hover:translate-x-0.5"
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                })}
                </div>

                {!isAuthenticated ? (
                  <div className="mt-6 rounded-[1.6rem] border border-primary/10 bg-background/80 p-4 shadow-sm shadow-primary/5">
                    <div className="text-sm font-semibold">Start with LibraryHub</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Create your workspace, organize your catalog, and manage readers with a cleaner operational flow.
                    </p>
                    <div className="mt-4 space-y-3">
                      <Button
                        asChild
                        className="w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_16px_40px_-22px_rgba(79,70,229,0.7)]"
                      >
                      <Link href="/register">Get Started</Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full rounded-full border-border/70 bg-background/75"
                      >
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </div>
                  </div>
                ) : null}
              </motion.div>

                <div className="border-t border-primary/10 p-5">
                {isAuthenticated && user ? (
                  <div className="rounded-[1.5rem] border border-primary/10 bg-background/80 p-4 shadow-sm shadow-primary/5">
                    <div className="mb-4 flex items-center gap-3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={44}
                          height={44}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary/15 to-secondary/15 font-semibold text-primary">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {user.role === "ADMIN" ? "Administrator" : "Member"}
                        </p>
                      </div>
                      {user.role === "ADMIN" ? (
                        <Shield className="ml-auto h-4 w-4 text-primary" />
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="rounded-full">
                        <Link href="/settings">Settings</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="rounded-full"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
