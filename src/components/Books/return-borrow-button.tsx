"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ReturnBorrowButton({ borrowId }: { borrowId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleReturn() {
    startTransition(async () => {
      const response = await fetch(`/api/borrows/${borrowId}/return`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not return book");
        return;
      }

      setDone(true);
      toast.success("Book returned");
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-full"
      disabled={pending || done}
      onClick={handleReturn}
    >
      {done ? "Returned" : pending ? "Returning..." : "Return Book"}
    </Button>
  );
}
