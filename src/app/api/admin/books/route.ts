import { z } from "zod";
import { requireAdminUser } from "@/lib/auth";
import { revalidateLibraryViews } from "@/lib/library-revalidation";
import {
  createBookRecord,
  formatBookValidationError,
  getAdminBooks,
} from "@/modules/books/book.service";

export async function GET() {
  await requireAdminUser();
  const books = await getAdminBooks();
  return Response.json(books);
}

export async function POST(request: Request) {
  await requireAdminUser();

  try {
    const body = await request.json();
    const book = await createBookRecord(body);
    revalidateLibraryViews(book.id);
    return Response.json(book, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(formatBookValidationError(error), { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Failed to create book.";
    return Response.json({ message }, { status: 400 });
  }
}
