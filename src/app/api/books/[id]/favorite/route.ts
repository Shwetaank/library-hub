import { getCurrentUser } from "@/lib/auth";
import { revalidateLibraryViews } from "@/lib/library-revalidation";
import { addFavorite, removeFavorite } from "@/modules/favorites/favorite.service";

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
    const favorite = await addFavorite(user.id, bookId);
    revalidateLibraryViews(bookId);
    return Response.json(favorite, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Favorite failed.";
    return Response.json({ message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const bookId = Number(id);

  try {
    await removeFavorite(user.id, bookId);
    revalidateLibraryViews(bookId);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Favorite removal failed.";
    return Response.json({ message }, { status: 400 });
  }
}
