"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  BookOpen,
  Bell,
  LogIn,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface NavItem {
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*                              Navigation Config                             */
/* -------------------------------------------------------------------------- */

const navItems: NavItem[] = [
  { label: "Catalog", href: "/catalog" },
  { label: "Authors", href: "/authors" },
  { label: "Clubs", href: "/clubs" },
  { label: "Bestsellers", href: "/bestsellers" },
  { label: "About", href: "/about" },
];

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string): boolean => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= MAIN NAV ================= */}

        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-primary"
          >
            <div className="p-2 rounded-xl bg-linear-to-br from-primary/10 to-accent/10">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">LibraryHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition"
                >
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>

                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition"
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="md:hidden border-t py-4 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition"
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-border my-3" />

            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition"
                >
                  <User className="h-5 w-5" />
                  Dashboard
                </Link>

                <Link
                  href="/settings"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>

                <button
                  onClick={() => {
                    signOut();
                    closeMobile();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left hover:bg-destructive/10 hover:text-destructive transition"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg hover:bg-muted transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
