"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

interface LiveCounterProps {
  value: number;
  className?: string;
  suffix?: string;
  duration?: number;
  start?: number;
}

/* -------------------------------------------------------------------------- */
/* COMPONENT */
/* -------------------------------------------------------------------------- */

const LiveCounter: React.FC<LiveCounterProps> = ({
  value,
  className,
  suffix = "",
  duration = 0.8,
  start = 0,
}) => {
  const motionValue = useMotionValue(start);

  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
    mass: Math.max(duration, 0.1),
  });

  const display = useTransform(spring, (latest: number) =>
    Math.floor(latest).toLocaleString("en-US"),
  );

  React.useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return (
    <span
      className={cn(
        "flex items-end gap-1 font-mono font-semibold tracking-tight",
        className,
      )}
    >
      <motion.span>{display}</motion.span>
      {suffix && (
        <span className="text-[0.8em] text-inherit opacity-80">{suffix}</span>
      )}
    </span>
  );
};

export default LiveCounter;
