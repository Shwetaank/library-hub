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
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
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
    <AuthSplitShell
      badge="Sign In"
      title="Continue into your library workspace"
      description="Access your account to manage reading activity, borrowing workflows, and product operations from one connected experience."
      panelTitle="Sign in"
      panelDescription="Use your registered email and password to continue."
      footerPrompt="Don't have an account?"
      footerActionLabel="Create one"
      footerActionHref="/register"
      highlights={[
        {
          icon: ShieldCheck,
          title: "Secure access flow",
          description:
            "Authentication is backed by the existing Prisma user model and the current auth API contract.",
        },
        {
          icon: Users,
          title: "Reader and operator ready",
          description:
            "Sign in to continue your borrowing, favorites, and account workflows without losing context.",
        },
        {
          icon: Sparkles,
          title: "Consistent product surface",
          description:
            "The auth experience now follows the same palette, hierarchy, and interface language as the rest of LibraryHub.",
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
            placeholder="Enter your password"
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
          {loading ? "Signing in..." : "Continue"}
        </Button>

        <div className="rounded-[1.4rem] border border-primary/10 bg-background/76 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <KeyRound className="h-4 w-4 text-primary" />
            Current backend contract
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Login currently accepts <code>email</code> and <code>password</code>,
            which matches the existing auth schema and Prisma user model.
          </p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to the current product access flow and account policies.
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Need context first?{" "}
          <Link href="/about" className="font-semibold text-foreground hover:text-primary">
            Explore the platform
          </Link>
        </div>
      </form>
    </AuthSplitShell>
  );
};

export default LoginPage;
