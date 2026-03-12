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
  UserRound,
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
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
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
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  useEffect(() => {
    if (!submitted || countdown !== 0) return;

    router.push("/login");
  }, [countdown, router, submitted]);

  return (
    <AuthSplitShell
      badge="Create Account"
      title="Set up your LibraryHub account with the current product flow"
      description="Create an account to start using LibraryHub through the same system that powers the existing auth service, Prisma user model, and backend validation rules."
      panelTitle="Register"
      panelDescription="Create your account with the exact fields supported by the backend today."
      footerPrompt="Already have an account?"
      footerActionLabel="Sign in"
      footerActionHref="/login"
      highlights={[
        {
          icon: Library,
          title: "Backed by the current schema",
          description:
            "Prisma currently stores users with name, email, password, role, createdAt, and updatedAt. The form matches that contract directly.",
        },
        {
          icon: LockKeyhole,
          title: "Validation aligned with auth rules",
          description:
            "Registration follows the existing backend requirement for a strong password with uppercase, lowercase, and numeric characters.",
        },
        {
          icon: Sparkles,
          title: "Product-consistent onboarding",
          description:
            "The register flow now uses the same palette, spacing, and polished surface treatment as the rest of the public product pages.",
        },
      ]}
    >
      {submitted ? (
        <div className="space-y-5 py-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/15 bg-emerald-500/12 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Account created</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Your account has been created successfully. You will be redirected to sign in in{" "}
              <span className="font-semibold text-primary">{countdown}</span> seconds.
            </p>
          </div>
          <Button
            asChild
            className="h-12 w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_18px_40px_-22px_rgba(79,70,229,0.5)]"
          >
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
              className={`h-12 rounded-full bg-background/85 px-4 ${
                fieldErrors.name
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-primary/10"
              }`}
            />
            {fieldErrors.name ? (
              <p className="text-xs text-red-500">{fieldErrors.name[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Email address</label>
            <Input
              name="email"
              type="email"
              placeholder="hello@libraryhub.com"
              value={form.email}
              onChange={handleChange}
              className={`h-12 rounded-full bg-background/85 px-4 ${
                fieldErrors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-primary/10"
              }`}
            />
            {fieldErrors.email ? (
              <p className="text-xs text-red-500">{fieldErrors.email[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="At least 8 chars, 1 uppercase, 1 number"
              value={form.password}
              onChange={handleChange}
              className={`h-12 rounded-full bg-background/85 px-4 ${
                fieldErrors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-primary/10"
              }`}
            />
            {fieldErrors.password ? (
              <p className="text-xs text-red-500">{fieldErrors.password[0]}</p>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-[1.2rem] border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={!isValid || loading}
            className="h-12 w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_18px_40px_-22px_rgba(79,70,229,0.5)]"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <div className="rounded-[1.4rem] border border-primary/10 bg-background/76 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Backend-aligned registration fields
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              The current backend expects <code>name</code>, <code>email</code>, and{" "}
              <code>password</code>. New users are stored in Prisma with the default{" "}
              <code>USER</code> role.
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-primary/10 bg-background/76 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <UserRound className="h-4 w-4 text-secondary" />
              Password rule
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Use at least 8 characters with one uppercase letter, one lowercase letter,
              and one number to match the current auth schema.
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
  );
};

export default RegisterPage;
