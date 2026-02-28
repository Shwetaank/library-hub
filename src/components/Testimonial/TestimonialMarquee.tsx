"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "./data";
import { cn } from "@/lib/utils";

/**
 * TestimonialMarquee
 *
 * Infinite horizontal scrolling testimonial section.
 * - Duplicates testimonials for seamless looping
 * - Fixed card width & height for consistent layout
 * - Linear animation for smooth marquee effect
 * - Hover lift interaction
 * - Gradient fade edges for premium UI feel
 */

const TestimonialMarquee = () => {
  /**
   * Duplicate testimonials to create seamless infinite loop.
   * Without duplication, animation would reset visibly.
   */
  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [],
  );

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Sliding Track */}
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 30, // slower = smoother premium feel
          ease: "linear",
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={cn(
              "shrink-0 w-[320px] sm:w-90 md:w-95",
            )}
          >
            <Card
              className={cn(
                "h-65 rounded-3xl border border-border/40 bg-background/80",
                "backdrop-blur-xl shadow-xl hover:shadow-2xl",
                "transition-all duration-300 flex flex-col justify-between",
              )}
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                {/* Quote Section */}
                <p
                  className={cn(
                    "text-sm sm:text-base leading-relaxed text-justify line-clamp-4",
                  )}
                >
                  “{testimonial.message}”
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
                    <p className="text-sm font-semibold truncate">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />

      {/* Right Gradient Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
};

export default TestimonialMarquee;
