import { getCurrentUser } from "@/lib/auth";
import { revalidateLibraryViews } from "@/lib/library-revalidation";
import { borrowBook } from "@/modules/borrow/borrow.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const bookId = Number(id);

  try {
    const borrow = await borrowBook(user.id, bookId);
    revalidateLibraryViews(bookId);
    return Response.json(borrow, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Borrow failed.";
    return Response.json({ message }, { status: 400 });
  }
}
