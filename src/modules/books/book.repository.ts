import { prisma } from "@/lib/prisma";
import type { BookInput } from "./book.schema";

export function listAdminBooks() {
  return prisma.book.findMany({
    include: {
      _count: {
        select: {
          borrows: true,
          favorites: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
  });
}

export function findBookById(id: number) {
  return prisma.book.findUnique({
    where: { id },
  });
}

export function createBook(data: BookInput) {
  return prisma.book.create({
    data: {
      ...data,
      coverUrl: data.coverUrl || null,
    },
  });
}

export function updateBook(id: number, data: BookInput) {
  return prisma.book.update({
    where: { id },
    data: {
      ...data,
      coverUrl: data.coverUrl || null,
    },
  });
}

export function deleteBook(id: number) {
  return prisma.book.delete({
    where: { id },
  });
}
