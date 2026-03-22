"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Library,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AuthSplitShell } from "@/components/Auth/AuthSplitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterFieldErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

const SUCCESS_REDIRECT_SECONDS = 3;

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(SUCCESS_REDIRECT_SECONDS);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isValid = useMemo(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,100}$/;
    return (
      form.name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      passwordRegex.test(form.password)
    );
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof RegisterFieldErrors;
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data.message || "Unable to create account.");
        return;
      }

      toast.success("Account created successfully");
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submitted) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  useEffect(() => {
    if (submitted && countdown === 0) router.push("/login");
  }, [countdown, router, submitted]);

  return (
    <div className="page-surface">
      <AuthSplitShell
        badge="Create Account"
        title="Create your LibraryHub account"
        description="Start with a clean account setup flow, then move directly into catalog discovery, saved books, and the redesigned member experience."
        panelTitle="Register"
        panelDescription="Set up your account to start exploring books, clubs, and your personal workspace."
        footerPrompt="Already have an account?"
        footerActionLabel="Sign in"
        footerActionHref="/login"
        highlights={[
          {
            icon: Library,
            title: "Fast onboarding",
            description: "Create an account quickly and move into the discovery flow without extra friction.",
          },
          {
            icon: LockKeyhole,
            title: "Stronger account protection",
            description: "Choose a password with uppercase, lowercase, and numeric characters for a more secure account.",
          },
          {
            icon: Sparkles,
            title: "Product-consistent onboarding",
            description: "The account creation flow follows the same typography and editorial visual language as the rest of LibraryHub.",
          },
        ]}
      >
        {submitted ? (
          <div className="space-y-6 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em]">Account created</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                You will be redirected to sign in in{" "}
                <span className="font-semibold text-primary">{countdown}s</span>.
              </p>
            </div>
            <Button asChild className="h-12 w-full rounded-full bg-primary text-base text-primary-foreground hover:bg-primary/92">
              <Link href="/login">Continue to sign in</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Full name</label>
              <Input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`h-12 rounded-xl px-4 text-base ${
                  fieldErrors.name ? "border-destructive focus-visible:ring-destructive/40" : ""
                }`}
              />
              {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email address</label>
              <Input
                name="email"
                type="email"
                placeholder="hello@libraryhub.com"
                value={form.email}
                onChange={handleChange}
                className={`h-12 rounded-xl px-4 text-base ${
                  fieldErrors.email ? "border-destructive focus-visible:ring-destructive/40" : ""
                }`}
              />
              {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="At least 8 chars, 1 uppercase, 1 number"
                value={form.password}
                onChange={handleChange}
                className={`h-12 rounded-xl px-4 text-base ${
                  fieldErrors.password ? "border-destructive focus-visible:ring-destructive/40" : ""
                }`}
              />
              {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password[0]}</p>}
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" disabled={!isValid || loading} className="h-12 w-full rounded-full bg-primary text-base text-primary-foreground hover:bg-primary/92">
              {loading ? "Creating account..." : "Create account"}
            </Button>

            <div className="rounded-xl border bg-muted/40 p-4">
              <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Password guidance
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use at least 8 characters and include uppercase, lowercase, and a number to create a stronger account.
              </p>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Want to explore first?{" "}
              <Link href="/about" className="font-semibold text-foreground hover:text-primary">
                Learn about LibraryHub
              </Link>
            </div>
          </form>
        )}
      </AuthSplitShell>
    </div>
  );
};

export default RegisterPage;
