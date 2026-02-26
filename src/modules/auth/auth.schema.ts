import { z } from "zod";

/**
 * Email validation regex (RFC 5322 simplified version)
 * Used instead of deprecated `.email()` helper.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation rules:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 *
 * Adjust rules if you want lighter validation.
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,100}$/;

/**
 * Register Schema
 * ----------------
 * Validates incoming registration request body.
 * Ensures:
 * - Clean name input
 * - Valid email format
 * - Strong password
 */
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => emailRegex.test(value), {
      message: "Invalid email address",
    }),

  password: z.string().refine((value) => passwordRegex.test(value), {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
  }),
});

/**
 * Login Schema
 * -------------
 * Validates login request body.
 * Uses same email validation logic for consistency.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => emailRegex.test(value), {
      message: "Invalid email address",
    }),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Type Exports (Recommended for Service Layer)
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
