import { z } from "zod";

export const bookSchema = z
  .object({
    title: z.string().trim().min(2).max(200),
    description: z.string().trim().min(20).max(4000),
    author: z.string().trim().min(2).max(150),
    genre: z.string().trim().min(2).max(100),
    totalCopies: z.coerce.number().int().min(1).max(10000),
    available: z.coerce.number().int().min(0).max(10000),
    coverUrl: z
      .string()
      .trim()
      .url()
      .max(2048)
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.available <= data.totalCopies, {
    message: "Available copies cannot exceed total copies.",
    path: ["available"],
  });

export type BookInput = z.infer<typeof bookSchema>;
