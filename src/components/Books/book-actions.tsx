"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type BookState = {
  isAuthenticated: boolean;
  isFavorite: boolean;
  hasActiveBorrow: boolean;
  activeBorrowId: string | null;
  available: number;
  totalCopies: number;
  role?: string;
};

export function BookActions({
  bookId,
  initialAvailable,
}: {
  bookId: number;
  initialAvailable: number;
}) {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();
  const [state, setState] = useState<BookState>({
    isAuthenticated: false,
    isFavorite: false,
    hasActiveBorrow: false,
    activeBorrowId: null,
    available: initialAvailable,
    totalCopies: initialAvailable,
  });
  const [borrowPending, startBorrowTransition] = useTransition();
  const [favoritePending, startFavoriteTransition] = useTransition();

  useEffect(() => {
    let active = true;

    fetch(`/api/books/${bookId}/state`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load book state");
        }
        return response.json();
      })
      .then((data: BookState) => {
        if (active) {
          setState(data);
        }
      })
      .catch(() => {
        if (active) {
          setState((current) => ({ ...current, available: initialAvailable }));
        }
      });

    return () => {
      active = false;
    };
  }, [bookId, initialAvailable]);

  const canManage = user?.role === "ADMIN";

  function requireSignIn() {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return false;
    }

    return true;
  }

  function handleBorrow() {
    if (!requireSignIn() || canManage) {
      return;
    }

    startBorrowTransition(async () => {
      const response = await fetch(`/api/books/${bookId}/borrow`, { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not borrow book");
        return;
      }

      setState((current) => ({
        ...current,
        hasActiveBorrow: true,
        activeBorrowId: data.id,
        available: Math.max(0, current.available - 1),
      }));
      toast.success("Book borrowed");
      router.refresh();
    });
  }

  function handleToggleFavorite() {
    if (!requireSignIn() || canManage) {
      return;
    }

    startFavoriteTransition(async () => {
      const method = state.isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/books/${bookId}/favorite`, { method });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data.message ?? "Could not update favorite");
        return;
      }

      setState((current) => ({
        ...current,
        isFavorite: !current.isFavorite,
      }));
      toast.success(state.isFavorite ? "Removed from favorites" : "Added to favorites");
      router.refresh();
    });
  }

  const borrowDisabled =
    borrowPending ||
    !isAuthenticated ||
    canManage ||
    state.available < 1 ||
    state.hasActiveBorrow;

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant={state.isFavorite ? "default" : "outline"}
        className="w-full rounded-full"
        onClick={handleToggleFavorite}
        disabled={favoritePending || canManage}
      >
        <Heart className={`h-4 w-4 ${state.isFavorite ? "fill-current" : ""}`} />
        {favoritePending
          ? "Saving..."
          : state.isFavorite
            ? "Favorited"
            : "Add to Favorites"}
      </Button>
      <Button
        type="button"
        className="w-full rounded-full btn-brand"
        onClick={handleBorrow}
        disabled={borrowDisabled}
      >
        {canManage
          ? "Admin accounts cannot borrow"
          : borrowPending
            ? "Borrowing..."
            : state.hasActiveBorrow
              ? "Already Borrowed"
              : state.available < 1
                ? "Unavailable"
                : "Borrow Book"}
      </Button>
    </div>
  );
}
