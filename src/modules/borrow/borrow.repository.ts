import { prisma } from "@/lib/prisma";

export function findActiveBorrowForUserBook(userId: number, bookId: number) {
  return prisma.borrow.findFirst({
    where: {
      userId,
      bookId,
      returned: false,
    },
  });
}

export function findBorrowById(id: string) {
  return prisma.borrow.findUnique({
    where: { id },
    include: {
      book: true,
    },
  });
}

export function listUserActiveBorrows(userId: number) {
  return prisma.borrow.findMany({
    where: {
      userId,
      returned: false,
    },
    select: {
      id: true,
      bookId: true,
    },
  });
}

export async function createBorrowTransaction(userId: number, bookId: number, dueDate: Date) {
  return prisma.$transaction(async (tx) => {
    const book = await tx.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error("Book not found.");
    }

    if (book.available < 1) {
      throw new Error("No copies are currently available.");
    }

    const existing = await tx.borrow.findFirst({
      where: {
        userId,
        bookId,
        returned: false,
      },
    });

    if (existing) {
      throw new Error("You already have this book checked out.");
    }

    const borrow = await tx.borrow.create({
      data: {
        userId,
        bookId,
        dueDate,
      },
    });

    await tx.book.update({
      where: { id: bookId },
      data: {
        available: {
          decrement: 1,
        },
      },
    });

    return borrow;
  });
}

export async function returnBorrowTransaction(borrowId: string) {
  return prisma.$transaction(async (tx) => {
    const borrow = await tx.borrow.findUnique({
      where: { id: borrowId },
      include: {
        book: true,
      },
    });

    if (!borrow) {
      throw new Error("Borrow record not found.");
    }

    if (borrow.returned) {
      throw new Error("This borrow has already been returned.");
    }

    const updatedBorrow = await tx.borrow.update({
      where: { id: borrowId },
      data: {
        returned: true,
      },
    });

    await tx.book.update({
      where: { id: borrow.bookId },
      data: {
        available: {
          increment: 1,
        },
      },
    });

    return updatedBorrow;
  });
}
