import { AppShell } from "@/components/App/app-shell";
import { AdminDashboard } from "@/components/App/dashboard-admin";
import { BookManagement } from "@/components/Admin/book-management";
import { ROLES } from "@/constants/roles";
import { requireAdminUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard";
import { getAdminBooks } from "@/modules/books/book.service";

export default async function AdminPage() {
  await requireAdminUser();
  const [data, books] = await Promise.all([getAdminDashboardData(), getAdminBooks()]);

  return (
    <AppShell
      role={ROLES.ADMIN}
      heading="Admin center"
      subheading="A dedicated operating view for inventory pressure, live circulation, recent member activity, and support follow-up."
    >
      <div className="space-y-6">
        <AdminDashboard data={data} />
        <BookManagement initialBooks={books} />
      </div>
    </AppShell>
  );
}
