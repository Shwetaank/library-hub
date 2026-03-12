import { revalidatePath } from "next/cache";

export function revalidateLibraryViews(bookId?: number) {
  revalidatePath("/catalog");
  revalidatePath("/authors");
  revalidatePath("/bestsellers");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  if (typeof bookId === "number") {
    revalidatePath(`/catalog/${bookId}`);
  }
}
