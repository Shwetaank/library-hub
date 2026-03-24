"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Loader2, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- ANIMATION ---------------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------- TYPES ---------------- */

interface ContactPayload {
  name: string;
  email: string;
  organization: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactPayload, string[]>> & {
  global?: string;
};

/* ---------------- COMPONENT ---------------- */

const ContactPage: React.FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formValues, setFormValues] = useState<ContactPayload>({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const isValid = useMemo(() => {
    return (
      formValues.name.length >= 2 &&
      /\S+@\S+\.\S+/.test(formValues.email) &&
      formValues.organization.length >= 2 &&
      formValues.message.length >= 10
    );
  }, [formValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormValues({
      name: "",
      email: "",
      organization: "",
      message: "",
    });
    setCountdown(5);
    setTimeout(() => firstInputRef.current?.focus(), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setErrors({});

      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });

      const data: {
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactPayload, string[]>>;
      } = await res.json();

      if (!res.ok) {
        setErrors(data.fieldErrors || { global: data.error });
        return;
      }

      setSubmitted(true);
    } catch {
      setErrors({ global: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submitted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetForm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-125 w-125 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-20 md:px-10 xl:px-16"
      >
        <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          {/* LEFT CONTENT */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Contact LibraryHub
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Talk to our team about your
              <span className="block bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                library workflows
              </span>
            </h1>

            <p className="mt-6 text-muted-foreground max-w-lg">
              Get a demo, ask questions, or explore how LibraryHub fits your
              system.
            </p>

            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>• Product walkthroughs & demos</p>
              <p>• Workflow & system evaluation</p>
              <p>• Setup & onboarding guidance</p>
            </div>

            <div className="mt-10 rounded-2xl border bg-card/60 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure and private communication
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div variants={item}>
            <div className="rounded-3xl border-2 border-primary/10 bg-linear-to-br from-background to-primary/5 p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-semibold mt-4">
                      Request received
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      We’ll get back to you shortly.
                    </p>
                    <p className="mt-4 text-sm">Resetting in {countdown}s...</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold">
                      Schedule your demo
                    </h2>

                    <Input
                      ref={firstInputRef}
                      name="name"
                      placeholder="Full Name"
                      value={formValues.name}
                      onChange={handleChange}
                    />

                    <Input
                      name="email"
                      placeholder="Work Email"
                      value={formValues.email}
                      onChange={handleChange}
                    />

                    <Input
                      name="organization"
                      placeholder="Institution"
                      value={formValues.organization}
                      onChange={handleChange}
                    />

                    <Textarea
                      name="message"
                      placeholder="Tell us about your needs..."
                      rows={5}
                      value={formValues.message}
                      onChange={handleChange}
                    />

                    {errors.global && (
                      <p className="text-sm text-red-500">{errors.global}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={!isValid || loading}
                      className="w-full h-12 rounded-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. No spam.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* HOW IT WORKS */}
        <motion.section variants={item} className="mt-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Submit your request",
              "We review your needs",
              "Get a tailored response/demo",
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card/60 backdrop-blur p-6 text-center"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  0{i + 1}
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default ContactPage;
