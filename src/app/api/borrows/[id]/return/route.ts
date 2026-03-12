import { getCurrentUser } from "@/lib/auth";
import { ROLES } from "@/constants/roles";
import { revalidateLibraryViews } from "@/lib/library-revalidation";
import { returnBorrow } from "@/modules/borrow/borrow.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const borrow = await returnBorrow(user.id, id, user.role === ROLES.ADMIN);
    revalidateLibraryViews(borrow.bookId);
    return Response.json(borrow);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Return failed.";
    return Response.json({ message }, { status: 400 });
  }
}
