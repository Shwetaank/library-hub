"use client";

import { AdminDashboard } from "@/components/App/dashboard-admin";
import { BookManagement } from "@/components/Admin/book-management";

type AdminDashboardData = Awaited<
  ReturnType<typeof import("@/lib/dashboard").getAdminDashboardData>
>;

type AdminBooks = Awaited<
  ReturnType<typeof import("@/modules/books/book.service").getAdminBooks>
>;

type AdminPageContentProps = {
  data: AdminDashboardData;
  books: AdminBooks;
};

export function AdminPageContent({ data, books }: AdminPageContentProps) {
  return (
    <div className="space-y-6">
      <AdminDashboard data={data} />
      <BookManagement initialBooks={books} />
    </div>
  );
}
