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
      { label: "Catalog", href: "/catalog" },
      { label: "Authors", href: "/authors" },
      { label: "Clubs", href: "/clubs" },
      { label: "Bestsellers", href: "/bestsellers" },
    ];

    if (user?.role === "ADMIN") {
      base.push({ label: "Admin", href: "/admin" });
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
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b shadow-xl"
            : "bg-background/60 backdrop-blur-xl"
        }`}
      >
        <div className="h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <div className=" container mx-auto px-6">
          <div
            className={`grid items-center transition-[height] duration-300 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] ${
              scrolled ? "h-20" : "h-20"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center gap-4 group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition"
                >
                  <BookOpen className="h-8 w-8 text-primary animate-pulse" />
                </motion.div>
                <motion.span
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="text-xl font-bold bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent"
                >
                  LibraryHub
                </motion.span>
              </Link>
            </motion.div>

            <motion.nav
              className="hidden lg:flex items-center justify-center gap-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                },
              }}
            >
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
                      className={`relative rounded-lg px-3 py-2 text-sm font-bold transition ${
                        active
                          ? "bg-primary/10 bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent underline-offset-4"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="desktop-active-link"
                          className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary/80"
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
            </motion.nav>

            <div className="hidden md:flex items-center justify-end gap-8">
              <div className="group relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={themeToggleLabel}
                  title={themeToggleLabel}
                  className="relative cursor-pointer"
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
              </div>

              {isAuthenticated && user ? (
                <>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted transition">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                            {initials}
                          </div>
                        )}
                        <span className="text-sm font-medium">{user.name}</span>
                        {user.role === "ADMIN" && (
                          <Shield className="h-3 w-3 text-primary" />
                        )}
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>

                  <Button asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={openMobile}
              aria-label="Open navigation menu"
              className="justify-self-end md:hidden p-3 rounded-lg hover:bg-muted transition"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black z-50"
              onClick={closeMobile}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm
                         bg-background/95 backdrop-blur-2xl
                         border-l shadow-2xl z-50
                         flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <span className="text-lg font-semibold">Navigation</span>
                <button
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                  className="p-3 rounded-md hover:bg-muted transition"
                >
                  <X />
                </button>
              </div>

              {/* User Info */}
              {isAuthenticated && user && (
                <div className="px-6 py-5 border-b flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Nav Items */}
              <motion.div
                className="flex-1 px-4 py-6 space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative block px-4 py-3.5 rounded-xl text-sm font-medium transition ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) ? (
                        <motion.span
                          layoutId="mobile-active-link"
                          className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary/80"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      ) : null}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Actions */}
              <div className="p-6 border-t space-y-3">
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="w-full"
                  aria-label={themeToggleLabel}
                >
                  {isDarkTheme ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {themeToggleLabel}
                </Button>

                {isAuthenticated && user ? (
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button asChild className="w-full">
                      <Link href="/signup">Get Started</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full">
                      <Link href="/login">Sign In</Link>
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
