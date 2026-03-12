import { z } from "zod";
import {
  createBook,
  deleteBook,
  findBookById,
  listAdminBooks,
  updateBook,
} from "./book.repository";
import { bookSchema } from "./book.schema";

export async function getAdminBooks() {
  return listAdminBooks();
}

export async function createBookRecord(input: unknown) {
  const data = bookSchema.parse(input);
  return createBook(data);
}

export async function updateBookRecord(id: number, input: unknown) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid book id.");
  }

  const existing = await findBookById(id);

  if (!existing) {
    throw new Error("Book not found.");
  }

  const data = bookSchema.parse(input);
  return updateBook(id, data);
}

export async function deleteBookRecord(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid book id.");
  }

  const existing = await findBookById(id);

  if (!existing) {
    throw new Error("Book not found.");
  }

  return deleteBook(id);
}

export function formatBookValidationError(error: z.ZodError) {
  return {
    message: "Please correct the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors,
  };
}
