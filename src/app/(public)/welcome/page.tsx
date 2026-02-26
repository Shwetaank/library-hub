"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const duration = 4000;
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          router.push("/books");
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-purple-500/15 blur-3xl opacity-70" />

      {/* Main Card */}
      <Card className="relative w-full max-w-xl rounded-3xl border shadow-2xl backdrop-blur-xl bg-background/80">
        <CardContent className="p-12 text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <div className="relative p-5 rounded-full bg-primary/10">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to LibraryHub 🎉
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
              Your subscription was successful. You&apos;re now part of our
              modern, cloud-powered library ecosystem built for performance and
              scale.
            </p>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full rounded-xl"
            onClick={() => router.push("/books")}
          >
            Explore Books
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Redirecting automatically...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;
