import {
  createBorrowTransaction,
  findBorrowById,
  findActiveBorrowForUserBook,
  returnBorrowTransaction,
} from "./borrow.repository";

const DEFAULT_BORROW_DAYS = 14;

export async function borrowBook(userId: number, bookId: number) {
  if (!Number.isInteger(bookId) || bookId <= 0) {
    throw new Error("Invalid book id.");
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + DEFAULT_BORROW_DAYS);

  return createBorrowTransaction(userId, bookId, dueDate);
}

export async function returnBorrow(userId: number, borrowId: string, isAdmin = false) {
  const borrow = await findBorrowById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found.");
  }

  if (!isAdmin && borrow.userId !== userId) {
    throw new Error("You cannot return another member's borrow.");
  }

  return returnBorrowTransaction(borrowId);
}

export async function getBookBorrowState(userId: number, bookId: number) {
  const activeBorrow = await findActiveBorrowForUserBook(userId, bookId);

  return {
    hasActiveBorrow: Boolean(activeBorrow),
    activeBorrowId: activeBorrow?.id ?? null,
  };
}
