"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Library,
  Loader2,
  Mail,
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
        className={`h-12 rounded-xl border bg-background/80 px-4 text-base transition-all duration-300 focus:ring-4 focus:ring-primary/20 ${
          error ? "border-destructive focus-visible:ring-destructive/40" : "border-border/70"
        }`}
      />
      {error ? <p className="text-xs text-destructive">{error[0]}</p> : null}
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
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormValues({ name: "", email: "", organization: "", message: "" });
    setErrors({});
    setCountdown(5);
    setTimeout(() => firstInputRef.current?.focus(), 50);
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
        confetti({ particleCount: 3, angle: 60, spread: 70, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 70, origin: { x: 1 } });
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
    <div className="page-surface">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                 <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                  <Library className="h-4 w-4" />
                  Contact LibraryHub
                </div>
                <h1 className="hero-title mt-6 max-w-3xl !text-4xl sm:!text-5xl">
                  Let&apos;s shape a cleaner digital experience for your library.
                </h1>
                <p className="hero-copy mt-5 !max-w-2xl !text-base sm:!text-lg">
                  Reach out about catalog discovery, circulation workflows, account journeys, and
                  how LibraryHub can support a more structured member experience.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Discovery-led product walkthroughs",
                    "Private and secure inquiries",
                    "Fast follow-up from the team",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border bg-card/90 px-4 py-2 text-sm text-muted-foreground shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.7rem] border border-border/70 bg-card/88 p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                 <div className="mb-4 flex items-center justify-between">
                    <div className="text-base font-semibold">Why teams reach out</div>
                    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                      Open Conversations
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Product walkthroughs for discovery and borrowing flows",
                      "Questions about member accounts, clubs, and reader journeys",
                      "Help evaluating fit for schools, communities, or internal libraries",
                    ].map((line) => (
                      <div
                        key={line}
                        className="flex items-center gap-3 rounded-lg border bg-background/70 px-4 py-3"
                      >
                        <Sparkles className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground/85">{line}</span>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-[1440px] grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8 pt-2">
            <Card className="overflow-hidden rounded-[1.8rem] border border-border/70 bg-card/80 p-6 shadow-sm">
               <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }}
                    exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
                    className="space-y-6 py-10 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 text-primary">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                        Request received
                      </h3>
                      <p className="mt-3 text-base leading-7 text-muted-foreground">
                        Our team will reach out within 24 hours to continue the conversation.
                      </p>
                    </div>
                    <div className="rounded-xl border bg-background/80 px-5 py-3">
                      <p className="text-sm text-muted-foreground">
                        Returning to the form in{" "}
                        <span className="font-semibold text-primary">{countdown}s</span>.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }}
                    exit={{ opacity: 0, y: 15, transition: { duration: 0.3 } }}
                  >
                    <CardHeader className="p-0 text-center">
                      <CardTitle className="text-3xl font-semibold tracking-[-0.04em]">
                        Schedule your free demo
                      </CardTitle>
                      <CardDescription className="mt-2.5 text-base leading-7 text-muted-foreground">
                        Tell us about your institution and what you want to improve.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-8 p-0">
                      <form onSubmit={handleSubmit} className="space-y-6">
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
                            rows={4}
                            placeholder="Describe your current workflow, goals, or questions..."
                            className={`rounded-xl border bg-background/80 px-4 py-3 text-base transition-all duration-300 focus:ring-4 focus:ring-primary/20 ${
                              errors.message ? "border-destructive focus-visible:ring-destructive/40" : "border-border/70"
                            }`}
                          />
                          {errors.message ? (
                            <p className="text-xs text-destructive">{errors.message[0]}</p>
                          ) : null}
                        </div>
                        {errors.global ? (
                          <p className="text-sm text-destructive">{errors.global}</p>
                        ) : null}
                        <Button
                          type="submit"
                          disabled={!isValid || loading}
                          className="h-12 w-full rounded-full bg-primary text-base text-primary-foreground hover:bg-primary/92 disabled:opacity-60"
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
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Secure and private. We never share your data.
                        </div>
                      </form>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="ui-card-elevated rounded-[1.8rem] border-border/70 bg-card/90 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.05em]">What happens next</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    After you send a request, the team reviews your note, follows up by email, and
                    helps you decide whether a demo, setup conversation, or product walkthrough is
                    the right next step.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="ui-card-elevated rounded-[1.8rem] border-border/70 bg-card/90 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Good things to include
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "The type of library or reading program you run",
                  "Which workflows feel messy today: discovery, circulation, or accounts",
                  "Whether you want a demo, feedback, or implementation guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-border/70 bg-background/70 px-4 py-3 text-sm leading-7 text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="ui-card-elevated rounded-[1.8rem] border-border/70 bg-card/90 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/30 text-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.05em]">Thoughtful responses, not canned replies</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    The contact flow is meant for real conversations about fit, product direction,
                    and how the redesigned interface can support your readers and staff.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
