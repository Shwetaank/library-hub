import { prisma } from "@/lib/prisma";

export function findFavorite(userId: number, bookId: number) {
  return prisma.favorite.findFirst({
    where: {
      userId,
      bookId,
    },
  });
}

export function createFavorite(userId: number, bookId: number) {
  return prisma.favorite.create({
    data: {
      userId,
      bookId,
    },
  });
}

export function deleteFavorite(id: string) {
  return prisma.favorite.delete({
    where: { id },
  });
}
