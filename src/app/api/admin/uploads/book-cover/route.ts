import { requireAdminUser } from "@/lib/auth";
import { uploadBookCover } from "@/lib/blob-storage";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  await requireAdminUser();

  const formData = await request.formData();
  const fileEntry = formData.get("file");
  const bookTitle = String(formData.get("bookTitle") ?? "").trim();

  if (!(fileEntry instanceof File)) {
    return Response.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!ACCEPTED_IMAGE_TYPES.has(fileEntry.type)) {
    return Response.json(
      { message: "Only JPG, PNG, WEBP, and GIF images are allowed." },
      { status: 400 },
    );
  }

  if (fileEntry.size === 0 || fileEntry.size > MAX_FILE_SIZE_BYTES) {
    return Response.json(
      { message: "Image size must be between 1 byte and 5 MB." },
      { status: 400 },
    );
  }

  try {
    const upload = await uploadBookCover({
      file: fileEntry,
      bookTitle,
    });

    return Response.json(
      {
        message: "Book cover uploaded successfully.",
        ...upload,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload book cover.";

    return Response.json({ message }, { status: 500 });
  }
}
