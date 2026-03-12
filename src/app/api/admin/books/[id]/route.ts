import { z } from "zod";
import { requireAdminUser } from "@/lib/auth";
import { revalidateLibraryViews } from "@/lib/library-revalidation";
import {
  deleteBookRecord,
  formatBookValidationError,
  updateBookRecord,
} from "@/modules/books/book.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  await requireAdminUser();
  const { id } = await context.params;
  const bookId = Number(id);

  try {
    const body = await request.json();
    const book = await updateBookRecord(bookId, body);
    revalidateLibraryViews(book.id);
    return Response.json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(formatBookValidationError(error), { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Failed to update book.";
    return Response.json({ message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  await requireAdminUser();
  const { id } = await context.params;
  const bookId = Number(id);

  try {
    await deleteBookRecord(bookId);
    revalidateLibraryViews(bookId);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete book.";
    return Response.json({ message }, { status: 400 });
  }
}
