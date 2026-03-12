import { AppShell } from "@/components/App/app-shell";
import { AdminDashboard } from "@/components/App/dashboard-admin";
import { ROLES } from "@/constants/roles";
import { requireAdminUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard";

export default async function AdminPage() {
  await requireAdminUser();
  const data = await getAdminDashboardData();

  return (
    <AppShell
      role={ROLES.ADMIN}
      heading="Admin center"
      subheading="A dedicated operating view for inventory pressure, live circulation, recent member activity, and support follow-up."
    >
      <AdminDashboard data={data} />
    </AppShell>
  );
}
