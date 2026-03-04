"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "./data";
import { cn } from "@/lib/utils";

const TestimonialMarquee = () => {
  // Duplicate for seamless loop
  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [],
  );

  return (
    <div className="relative w-full overflow-hidden py-14">
      {/* Sliding Track */}
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 120,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="shrink-0 w-75 sm:w-85 md:w-90"
          >
            <Card
              className={cn(
                "h-65 rounded-3xl border border-border/40",
                "bg-linear-to-br from-primary/10 to-purple-500/10",
                "backdrop-blur-xl shadow-lg hover:shadow-2xl",
                "transition-all duration-300 flex flex-col justify-between",
              )}
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                {/* Message */}
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-4 text-justify">
                  â€œ{testimonial.message}â€
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-6">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate bg-linear-to-r from-primary to-purple-500 dark:from-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {testimonial.institution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Left Gradient Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent" />

      {/* Right Gradient Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent" />
    </div>
  );
};

export default TestimonialMarquee;

