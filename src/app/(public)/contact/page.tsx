"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Library,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TestimonialSlider = dynamic(
  () => import("@/components/Testimonial/TestimonialMarquee"),
  {
    loading: () => <div className="h-[360px] w-full rounded-[1.8rem] bg-muted/30" />,
  },
);

interface ContactPayload {
  name: string;
  email: string;
  organization: string;
  message: string;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  organization?: string[];
  message?: string[];
  global?: string;
}

interface FormFieldProps {
  label: string;
  name: keyof ContactPayload;
  type?: string;
  value: string;
  error?: string[];
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, type = "text", value, error, placeholder, onChange }, ref) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>

      <Input
        ref={ref}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`h-12 rounded-full border-primary/10 bg-background/85 px-4 text-sm transition ${
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        }`}
      />

      {error ? <p className="text-xs text-red-500">{error[0]}</p> : null}
    </div>
  ),
);

FormField.displayName = "FormField";

const ContactPage: React.FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formValues, setFormValues] = useState<ContactPayload>({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const isValid = useMemo(() => {
    return (
      formValues.name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(formValues.email) &&
      formValues.organization.trim().length >= 2 &&
      formValues.message.trim().length >= 10
    );
  }, [formValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormValues({
      name: "",
      email: "",
      organization: "",
      message: "",
    });
    setErrors({});
    setCountdown(5);

    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setErrors({});

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        else setErrors({ global: data.error || "Something went wrong." });
        return;
      }

      setSubmitted(true);

      const { default: confetti } = await import("canvas-confetti");
      const duration = 1400;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 4,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };

      frame();
    } catch {
      setErrors({ global: "Network error. Please try again." });
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
          resetForm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  return (
    <section className="page-surface relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.12),transparent_24%)]" />
      <div className="noise-grid pointer-events-none absolute inset-x-6 top-0 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="container relative mx-auto grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-primary/20 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
            >
              <Library className="mr-1.5 h-3.5 w-3.5" />
              Contact LibraryHub
            </Badge>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="accent-text">
                Customize your library workflow with a product-grade platform
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Talk to the team about circulation, catalog workflows, member
              management, and how LibraryHub can fit your institution with a
              cleaner operational setup.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "Trusted by 120+ institutions",
              "Private and secure inquiries",
              "24-hour response target",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/10 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="hero-shell p-5 sm:p-6">
            <div className="grid gap-4">
              <Card className="glass-panel rounded-[1.5rem] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Why teams reach out</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Common conversations
                    </div>
                  </div>
                  <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Demo Ready
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Platform walkthroughs and product demos",
                    "Operational fit for schools and institutions",
                    "Migration, onboarding, and workflow questions",
                  ].map((line) => (
                    <div
                      key={line}
                      className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/75 px-4 py-3"
                    >
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-foreground/85">{line}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <TestimonialSlider />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-panel mesh-card overflow-hidden rounded-[2rem] border border-primary/10 p-6 shadow-[0_24px_70px_-40px_rgba(79,70,229,0.4)] sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-5 py-10 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/15 bg-emerald-500/12 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">
                    Request received
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    Our team will reach out within 24 hours to continue the conversation.
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-primary/10 bg-background/76 px-5 py-4">
                  <p className="text-sm text-muted-foreground">
                    Returning to the form in{" "}
                    <span className="font-semibold text-primary">{countdown}</span>{" "}
                    seconds.
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetForm}
                    className="rounded-full border-primary/10 bg-background/80 px-6"
                  >
                    Submit another request
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-linear-to-r from-primary to-secondary px-6 text-primary-foreground"
                  >
                    <Link href="/about">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <CardHeader className="px-0 pb-0 text-center">
                  <CardTitle className="text-3xl font-semibold tracking-tight">
                    Schedule your free demo
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6 text-muted-foreground">
                    Tell us about your institution and what you want to improve.
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-6 px-0">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                      label="Full Name"
                      name="name"
                      value={formValues.name}
                      error={errors.name}
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      ref={firstInputRef}
                    />

                    <FormField
                      label="Work Email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      error={errors.email}
                      placeholder="Enter your work email"
                      onChange={handleChange}
                    />

                    <FormField
                      label="Institution Name"
                      name="organization"
                      value={formValues.organization}
                      error={errors.organization}
                      placeholder="Enter your institution name"
                      onChange={handleChange}
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Tell us about your needs
                      </label>
                      <Textarea
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your current workflow, goals, or questions..."
                        className={`rounded-[1.5rem] border-primary/10 bg-background/85 px-4 py-3 text-sm ${
                          errors.message ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                      />
                      {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message[0]}</p>
                      ) : null}
                    </div>

                    {errors.global ? (
                      <p className="text-sm text-red-500">{errors.global}</p>
                    ) : null}

                    <Button
                      type="submit"
                      disabled={!isValid || loading}
                      className="h-12 w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_16px_40px_-22px_rgba(79,70,229,0.5)] disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Secure and private. We never share your data.
                    </div>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
