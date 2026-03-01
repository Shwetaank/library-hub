"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Props for LiveCounter component
 * @property value - The numeric value to animate towards
 */
interface LiveCounterProps {
  value: number;
}

/**
 * LiveCounter Component
 *
 * Smoothly animates numeric value changes using Framer Motion.
 * - Uses motion value for reactive updates
 * - Applies spring physics for smooth animation
 * - Formats output with locale-based number formatting
 *
 * Used for live platform metrics (readers, books, transactions).
 */
const LiveCounter: React.FC<LiveCounterProps> = ({ value }) => {
  /**
   * Base motion value that tracks the current animated number.
   * Initialized with the incoming value.
   */
  const motionValue = useMotionValue(value);

  /**
   * Spring animation applied to the motion value.
   * - stiffness controls speed
   * - damping controls bounce
   */
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
  });

  /**
   * Transform the animated value:
   * - Round down to integer
   * - Format with thousand separators (e.g., 5,000)
   */
  const display = useTransform(spring, (latest) =>
    Math.floor(latest).toLocaleString("en-US"),
  );

  /**
   * When `value` prop changes:
   * - Update the motion value
   * - Spring automatically animates to the new number
   */
  React.useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return (
    <motion.span className="text-5xl sm:text-6xl font-bold font-mono bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
      {display}
    </motion.span>
  );
};

export default LiveCounter;
