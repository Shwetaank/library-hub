import { findBookById } from "@/modules/books/book.repository";
import { createFavorite, deleteFavorite, findFavorite } from "./favorite.repository";

export async function addFavorite(userId: number, bookId: number) {
  const book = await findBookById(bookId);

  if (!book) {
    throw new Error("Book not found.");
  }

  const existing = await findFavorite(userId, bookId);

  if (existing) {
    return existing;
  }

  return createFavorite(userId, bookId);
}

export async function removeFavorite(userId: number, bookId: number) {
  const existing = await findFavorite(userId, bookId);

  if (!existing) {
    return null;
  }

  return deleteFavorite(existing.id);
}

export async function getFavoriteState(userId: number, bookId: number) {
  const existing = await findFavorite(userId, bookId);
  return Boolean(existing);
}
