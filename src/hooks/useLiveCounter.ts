"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useLiveCounter Hook
 *
 * Simulates live metric updates within a defined range.
 * Useful for dashboards, analytics previews, and demo environments.
 *
 * @param initial - Initial counter value
 * @param min - Minimum boundary value
 * @param max - Maximum boundary value
 *
 * @returns
 *  count: current numeric value
 *  direction: "up" | "down" trend indicator
 *  percentage: percentage change from previous value
 */
export const useLiveCounter = (initial: number, min: number, max: number) => {
  /**
   * Current counter value
   */
  const [count, setCount] = useState(initial);

  /**
   * Direction of change (used for UI indicators)
   */
  const [direction, setDirection] = useState<"up" | "down">("up");

  /**
   * Percentage change from previous value
   */
  const [percentage, setPercentage] = useState(0);

  /**
   * Stores previous value without triggering re-renders.
   * Used to calculate percentage change accurately.
   */
  const previous = useRef(initial);

  useEffect(() => {
    /**
     * Interval simulates live updates every 2.5 seconds.
     * Generates random increase/decrease within defined bounds.
     */
    const interval = setInterval(() => {
      setCount((prev) => {
        // Random change amount between 1 and 50
        const change = Math.floor(Math.random() * 50) + 1;

        // 65% chance of increase, 35% decrease
        const isIncrease = Math.random() > 0.35;

        let newValue = isIncrease ? prev + change : prev - change;

        // Enforce min/max boundaries
        if (newValue > max) newValue = max;
        if (newValue < min) newValue = min;

        /**
         * Calculate percentage difference from previous value
         */
        const percentChange =
          ((newValue - previous.current) / previous.current) * 100;

        // Store formatted percentage (2 decimal precision)
        setPercentage(Number(percentChange.toFixed(2)));

        // Determine trend direction
        setDirection(newValue > previous.current ? "up" : "down");

        // Update reference for next cycle
        previous.current = newValue;

        return newValue;
      });
    }, 2500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [min, max]);

  return { count, direction, percentage };
};
