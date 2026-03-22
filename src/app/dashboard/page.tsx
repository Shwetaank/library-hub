import { AppShell } from "@/components/App/app-shell";
import { AdminDashboard } from "@/components/App/dashboard-admin";
import { BookManagement } from "@/components/Admin/book-management";
import { UserDashboard } from "@/components/App/dashboard-user";
import { ROLES } from "@/constants/roles";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAdminDashboardData, getUserDashboardData } from "@/lib/dashboard";
import { getAdminBooks } from "@/modules/books/book.service";

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser();

  if (user.role === ROLES.ADMIN) {
    const [data, books] = await Promise.all([getAdminDashboardData(), getAdminBooks()]);

    return (
      <AppShell
        role={ROLES.ADMIN}
        heading="Operations overview"
        subheading="Track circulation, catalog health, member growth, and incoming support demand without leaving the workspace."
      >
        <div className="space-y-6">
          <AdminDashboard data={data} />
          <BookManagement initialBooks={books} />
        </div>
      </AppShell>
    );
  }

  const data = await getUserDashboardData(user.id);

  if (!data) {
    return null;
  }

  return (
    <AppShell
      role={ROLES.USER}
      heading="Reader dashboard"
      subheading="Stay on top of your current loans, saved books, and reading history through a calmer personal workspace."
    >
      <UserDashboard data={data} />
    </AppShell>
  );
}
