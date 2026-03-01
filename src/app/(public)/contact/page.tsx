"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import TestimonialSlider from "@/components/Testimonial/TestimonialMarquee";

/* ---------------- TYPES ---------------- */

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

/* ---------------- FORM FIELD ---------------- */

interface FormFieldProps {
  label: string;
  name: keyof ContactPayload;
  type?: string;
  value: string;
  error?: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, type = "text", value, error, onChange }, ref) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>

      <Input
        ref={ref}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`h-12 text-sm transition ${
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        }`}
      />

      {error && <p className="text-xs text-red-500">{error[0]}</p>}
    </div>
  ),
);

FormField.displayName = "FormField";

/* ---------------- MAIN COMPONENT ---------------- */

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

  /* -------- CLIENT VALIDATION -------- */

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

    // Focus first field
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);
  };

  /* -------- SUBMIT -------- */

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

      /* 🎉 Smooth Multi-Burst Confetti */
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

  /* -------- COUNTDOWN -------- */

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

  /* ---------------- RENDER ---------------- */

  return (
    <section className="relative overflow-hidden py-20 bg-linear-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 gap-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Trusted by 120+ Institutions
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-\[1.4] pb-1 bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Custmize Your Library
          </h1>

          <p className="text-muted-foreground">
            Automate tracking, simplify borrowing, and deliver a modern digital
            experience to your institution.
          </p>

          <TestimonialSlider />
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-3xl p-8 shadow-lg">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4"
              >
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />

                <h3 className="text-2xl font-semibold">
                  You&apos;re All Set 🎉
                </h3>

                <p className="text-muted-foreground ">
                  Our team will contact you within 24 hours.
                </p>

                <p className="text-sm text-muted-foreground">
                  Returning to the form in{" "}
                  <span className="font-bold text-primary">{countdown}</span>{" "}
                  seconds...
                </p>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetForm}
                  className="bg-linear-to-r from-primary to-purple-500 text-white"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <>
                <CardHeader className="px-0">
                  <CardTitle className="text-3xl text-center font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Schedule Your Free Demo
                  </CardTitle>
                  <CardDescription>Takes less than 30 seconds.</CardDescription>
                </CardHeader>

                <CardContent className="px-0 mt-5">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                      label="Full Name"
                      name="name"
                      value={formValues.name}
                      error={errors.name}
                      onChange={handleChange}
                      ref={firstInputRef}
                    />

                    <FormField
                      label="Work Email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      error={errors.email}
                      onChange={handleChange}
                    />

                    <FormField
                      label="Institution Name"
                      name="organization"
                      value={formValues.organization}
                      error={errors.organization}
                      onChange={handleChange}
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">
                        Tell us about your needs
                      </label>
                      <Textarea
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                        rows={4}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500">
                          {errors.message[0]}
                        </p>
                      )}
                    </div>

                    {errors.global && (
                      <p className="text-sm text-red-500">{errors.global}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={!isValid || loading}
                      className="w-full h-12 bg-linear-to-r from-primary to-purple-500 disabled:opacity-60 animate-pulse cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      Secure & private. We never share your data.
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
