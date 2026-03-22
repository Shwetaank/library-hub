"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { KeyRound, ShieldCheck, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";
import { AuthSplitShell } from "@/components/Auth/AuthSplitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFieldErrors = {
  email?: string[];
  password?: string[];
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { refetchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const isValid = useMemo(() => {
    return /\S+@\S+\.\S+/.test(form.email) && form.password.trim().length >= 8;
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof LoginFieldErrors;
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

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data.message || "Unable to sign in.");
        return;
      }

      toast.success("Signed in successfully");
      await refetchUser();
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-surface">
      <AuthSplitShell
        badge="Sign In"
        title="Return to your reading workspace"
        description="Sign in to continue browsing saved titles, checking current loans, and moving through the same calm interface used across the full LibraryHub experience."
        panelTitle="Sign in"
        panelDescription="Use your email and password to continue where you left off."
        footerPrompt="Don't have an account?"
        footerActionLabel="Create one"
        footerActionHref="/register"
        highlights={[
          {
            icon: ShieldCheck,
            title: "Secure access",
            description: "Account entry is protected so members and staff can move through the platform with confidence.",
          },
          {
            icon: Users,
            title: "Built for readers and operators",
            description: "Continue borrowing, favorites, and account activity without losing context between screens.",
          },
          {
            icon: Sparkles,
            title: "Consistent product surface",
            description: "The sign-in flow follows the same typography, spacing, and visual language as the rest of LibraryHub.",
          },
        ]}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
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
            {loading ? "Signing in..." : "Continue"}
          </Button>

          <div className="rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <KeyRound className="h-5 w-5 text-primary" />
              Need a quick reminder?
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use the same email address you signed up with and your account password to return to your workspace.
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Need context first?{" "}
            <Link href="/about" className="font-semibold text-foreground hover:text-primary">
              Explore the platform
            </Link>
          </div>
        </form>
      </AuthSplitShell>
    </div>
  );
};

export default LoginPage;
