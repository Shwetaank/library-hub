import { AppShell } from "@/components/App/app-shell";
import { SettingsForm } from "@/components/App/settings-form";
import type { AppRole } from "@/constants/roles";
import { requireAuthenticatedUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireAuthenticatedUser();

  return (
    <AppShell
      role={user.role as AppRole}
      heading="Settings"
      subheading="Manage Prisma-backed account details, password security, and the preference layer that completes the workspace experience."
    >
      <SettingsForm user={user} />
    </AppShell>
  );
}
