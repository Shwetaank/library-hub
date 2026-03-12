import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBookBorrowState } from "@/modules/borrow/borrow.service";
import { getFavoriteState } from "@/modules/favorites/favorite.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const bookId = Number(id);

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: {
      id: true,
      available: true,
      totalCopies: true,
    },
  });

  if (!book) {
    return Response.json({ message: "Book not found." }, { status: 404 });
  }

  const user = await getCurrentUser();

  if (!user) {
    return Response.json({
      isAuthenticated: false,
      isFavorite: false,
      hasActiveBorrow: false,
      activeBorrowId: null,
      available: book.available,
      totalCopies: book.totalCopies,
    });
  }

  const [favorite, borrow] = await Promise.all([
    getFavoriteState(user.id, bookId),
    getBookBorrowState(user.id, bookId),
  ]);

  return Response.json({
    isAuthenticated: true,
    isFavorite: favorite,
    hasActiveBorrow: borrow.hasActiveBorrow,
    activeBorrowId: borrow.activeBorrowId,
    available: book.available,
    totalCopies: book.totalCopies,
    role: user.role,
  });
}
