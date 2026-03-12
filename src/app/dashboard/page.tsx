import { AppShell } from "@/components/App/app-shell";
import { AdminDashboard } from "@/components/App/dashboard-admin";
import { UserDashboard } from "@/components/App/dashboard-user";
import { ROLES } from "@/constants/roles";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAdminDashboardData, getUserDashboardData } from "@/lib/dashboard";

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser();

  if (user.role === ROLES.ADMIN) {
    const data = await getAdminDashboardData();

    return (
      <AppShell
        role={ROLES.ADMIN}
        heading="Operations overview"
        subheading="Track circulation, catalog health, member growth, and incoming support demand without leaving the workspace."
      >
        <AdminDashboard data={data} />
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
      subheading="Stay on top of your current loans, saved books, and reading history with a product-grade personal workspace."
    >
      <UserDashboard data={data} />
    </AppShell>
  );
}
