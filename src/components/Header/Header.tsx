"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Heart,
  LayoutDashboard,
  LibraryBig,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  Trophy,
  Users,
  X,
} from "lucide-react";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import clsx from "clsx";

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

/* Animations */
const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

const menuContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const menuItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ESC close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navItems = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [
      {
        label: "Discover",
        href: "/catalog",
        description: "Catalog and availability",
        icon: LibraryBig,
      },
      {
        label: "Authors",
        href: "/authors",
        description: "Writers and collections",
        icon: Users,
      },
      {
        label: "Reading Clubs",
        href: "/clubs",
        description: "Community spaces",
        icon: Heart,
      },
      {
        label: "Bestsellers",
        href: "/bestsellers",
        description: "High-demand titles",
        icon: Trophy,
      },
      {
        label: "About",
        href: "/about",
        description: "Product story",
        icon: BookOpen,
      },
    ];

    if (user?.role === "ADMIN") {
      items.push({
        label: "Workspace",
        href: "/dashboard",
        description: "Admin tools",
        icon: LayoutDashboard,
      });
    }

    return items;
  }, [user?.role]);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "LH";

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut();
    } finally {
      setLoggingOut(false);
    }
  };

  const handleNavClick = () => setMobileOpen(false);

  const themeIcon = mounted ? (
    <motion.div
      key={resolvedTheme}
      initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </motion.div>
  ) : (
    <div className="h-4.5 w-4.5" />
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto px-4 sm:px-6">
          <div className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-15 w-15 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary shadow-sm">
                <BookOpen className="h-8 w-8 animate-pulse" />
              </div>

              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-xl font-bold tracking-[-0.07em] text-primary animate-pulse">
                  LibraryHub
                </div>
                <div className="font-mono text-[0.68rem]  tracking-[0.24em] text-muted-foreground">
                  Discovery-led library platform
                </div>
              </motion.div>
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-4">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ y: -3, scale: 1.03 }}>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={clsx(
                        "h-auto rounded-full px-5 py-3 transition-all duration-300",
                        isActive(item.href)
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-primary/8 hover:text-foreground cursor-pointer",
                      )}
                    >
                      <span className="flex flex-col items-start text-left">
                        <span className="text-sm font-bold">{item.label}</span>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <Button
                aria-label="Toggle theme"
                variant="ghost"
                size="icon"
                className="rounded-2xl animate-pulse cursor-pointer"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                <AnimatePresence mode="wait">{themeIcon}</AnimatePresence>
              </Button>

              {isAuthenticated && user ? (
                <>
                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <Bell size={18} />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-2.5 py-1.5 transition hover:bg-primary/8">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt=""
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {initials}
                          </div>
                        )}
                        <span className="pr-1 text-sm font-medium">
                          {user.name}
                        </span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-52">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {loggingOut ? "Signing out..." : "Logout"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-border/70 bg-card/88 hover:bg-primary/8 hover:text-foreground"
                  >
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </Link>
                  </Button>

                  <Button asChild className="rounded-full btn-brand">
                    <Link href="/register">Create account</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                <AnimatePresence mode="wait">{themeIcon}</AnimatePresence>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm border-l border-border/70 bg-background/96 p-6 backdrop-blur-xl"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold tracking-[-0.04em]">
                    LibraryHub
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Navigation
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <motion.div
                variants={menuContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.href} variants={menuItem}>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={clsx(
                          "flex items-start gap-3 rounded-4xl border border-border/70 p-4 transition",
                          isActive(item.href)
                            ? "bg-primary/8 text-foreground"
                            : "bg-card/70 hover:bg-primary/6 hover:text-foreground",
                        )}
                      >
                        <Icon size={18} className="mt-0.5 text-primary" />
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mt-6 space-y-3 border-t border-border/70 pt-6">
                {isAuthenticated ? (
                  <>
                    <Button asChild className="w-full rounded-full btn-brand">
                      <Link href="/dashboard" onClick={handleNavClick}>
                        Open workspace
                      </Link>
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full rounded-full"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-border/70 bg-card/88 hover:bg-primary/8 hover:text-foreground"
                    >
                      <Link href="/login" onClick={handleNavClick}>
                        Sign in
                      </Link>
                    </Button>

                    <Button asChild className="w-full rounded-full btn-brand">
                      <Link href="/register" onClick={handleNavClick}>
                        Create account
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
