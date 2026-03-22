"use client";

"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader, Surface } from "@/components/App/workspace-cards";

type AdminBook = {
  id: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  totalCopies: number;
  available: number;
  coverUrl: string | null;
  updatedAt: string | Date;
  _count: {
    borrows: number;
    favorites: number;
  };
};

type BookForm = {
  title: string;
  description: string;
  author: string;
  genre: string;
  totalCopies: string;
  available: string;
  coverUrl: string;
};

const emptyForm: BookForm = {
  title: "",
  description: "",
  author: "",
  genre: "",
  totalCopies: "1",
  available: "1",
  coverUrl: "",
};

function toForm(book: AdminBook): BookForm {
  return {
    title: book.title,
    description: book.description,
    author: book.author,
    genre: book.genre,
    totalCopies: String(book.totalCopies),
    available: String(book.available),
    coverUrl: book.coverUrl ?? "",
  };
}

export function BookManagement({ initialBooks }: { initialBooks: AdminBook[] }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [books, setBooks] = useState(initialBooks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BookForm>(emptyForm);
  const [pending, startTransition] = useTransition();
  const [uploadPending, setUploadPending] = useState(false);

  const isEditing = editingId !== null;

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function startEdit(book: AdminBook) {
    setEditingId(book.id);
    setForm(toForm(book));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const payload = {
        ...form,
        totalCopies: Number(form.totalCopies),
        available: Number(form.available),
      };

      const endpoint = isEditing ? `/api/admin/books/${editingId}` : "/api/admin/books";
      const method = isEditing ? "PATCH" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not save book");
        return;
      }

      setBooks((current) => {
        if (isEditing) {
          return current.map((book) =>
            book.id === data.id ? { ...book, ...data, _count: book._count } : book,
          );
        }
        return [{ ...data, _count: { borrows: 0, favorites: 0 } }, ...current];
      });

      resetForm();
      toast.success(isEditing ? "Book updated" : "Book created");
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const response = await fetch(`/api/admin/books/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not delete book");
        return;
      }

      setBooks((current) => current.filter((book) => book.id !== id));
      if (editingId === id) resetForm();
      toast.success("Book deleted");
    });
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadPending(true);
      const body = new FormData();
      body.append("file", file);
      if (form.title.trim()) body.append("bookTitle", form.title);

      const response = await fetch("/api/admin/uploads/book-cover", {
        method: "POST",
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not upload cover");
        return;
      }

      setForm((current) => ({ ...current, coverUrl: data.url }));
      toast.success("Cover uploaded");
    } finally {
      setUploadPending(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div id="catalog-manager" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Surface>
        <SectionHeader
          eyebrow="Inventory"
          title={isEditing ? "Edit book" : "Add book"}
          description="Manage catalog records, inventory counts, and cover URLs from one admin workspace."
        />
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
            <Input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
            <Input
              placeholder="Genre"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
            <Input
              placeholder="Cover URL"
              value={form.coverUrl}
              onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
            <Input
              type="number"
              min="1"
              placeholder="Total copies"
              value={form.totalCopies}
              onChange={(e) => setForm({ ...form, totalCopies: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
            <Input
              type="number"
              min="0"
              placeholder="Available"
              value={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.value })}
              className="h-12 rounded-xl text-base"
            />
          </div>
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="min-h-36 rounded-xl text-base"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleUpload}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/92" disabled={pending}>
              {isEditing ? (pending ? "Saving..." : "Save Changes") : (pending ? "Creating..." : <><Plus className="mr-1.5 h-4 w-4" />Create Book</>)}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={uploadPending}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-1.5 h-4 w-4" />
              {uploadPending ? "Uploading..." : "Upload Cover"}
            </Button>
            {isEditing && (
              <Button type="button" variant="ghost" className="rounded-full" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </Surface>

      <Surface>
        <SectionHeader
          eyebrow="Catalog"
          title="Manage books"
          description="Edit titles, remove obsolete entries, and monitor engagement counts."
        />
        <div className="mt-6 space-y-3">
          {books.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-border/80 p-6 text-center text-muted-foreground">
              No books created yet.
            </div>
          ) : (
            books.map((book) => (
              <div key={book.id} className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {book.coverUrl && (
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image src={book.coverUrl} alt={book.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-base font-semibold">{book.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {book.author} • {book.genre}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>{book.available} / {book.totalCopies} available</span>
                        <span>{book._count.borrows} borrows</span>
                        <span>{book._count.favorites} favorites</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => startEdit(book)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(book.id)}
                      disabled={pending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Surface>
    </div>
  );
}
