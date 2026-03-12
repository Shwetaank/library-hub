"use client";

import { useState, useTransition } from "react";
import { BellRing, KeyRound, Shield, SlidersHorizontal, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROLE_LABELS, ROLES, type AppRole } from "@/constants/roles";
import { SectionHeader, Surface } from "@/components/App/workspace-cards";

type SettingsFormProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: AppRole;
    createdAt: Date;
  };
};

type Preferences = {
  digestEmails: boolean;
  dueReminders: boolean;
  compactMode: boolean;
  workspaceNote: string;
};

const defaultPreferences: Preferences = {
  digestEmails: true,
  dueReminders: true,
  compactMode: false,
  workspaceNote: "",
};

function getInitialPreferences(userId: number): Preferences {
  if (typeof window === "undefined") return defaultPreferences;
  const key = `libraryhub-preferences-${userId}`;
  const raw = window.localStorage.getItem(key);
  if (!raw) return defaultPreferences;

  try {
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    window.localStorage.removeItem(key);
    return defaultPreferences;
  }
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState<Preferences>(() =>
    getInitialPreferences(user.id),
  );
  const [profilePending, startProfileTransition] = useTransition();
  const [passwordPending, startPasswordTransition] = useTransition();
  const [preferencesPending, startPreferencesTransition] = useTransition();

  function savePreferences(next: Preferences) {
    const key = `libraryhub-preferences-${user.id}`;
    startPreferencesTransition(() => {
      window.localStorage.setItem(key, JSON.stringify(next));
      setPreferences(next);
      toast.success("Saved");
    });
  }

  async function submitProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startProfileTransition(async () => {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message ?? "Could not update profile");
        return;
      }
      toast.success("Saved");
    });
  }

  async function submitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startPasswordTransition(async () => {
      const response = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message ?? "Could not update password");
        return;
      }
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Saved");
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <Surface className="h-fit">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,70,229,0.16),rgba(245,158,11,0.16))] text-lg font-semibold text-primary">
            {user.name
              .split(" ")
              .map((segment) => segment[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="text-xl font-semibold tracking-[-0.03em]">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[1.4rem] border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Role</div>
            <div className="mt-2 text-sm font-medium">{ROLE_LABELS[user.role]}</div>
          </div>
          <div className="rounded-[1.4rem] border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Since</div>
            <div className="mt-2 text-sm font-medium">{user.createdAt.toLocaleDateString()}</div>
          </div>
          <div className="rounded-[1.4rem] border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Source</div>
            <div className="mt-2 text-sm text-muted-foreground">Prisma-backed account</div>
          </div>
        </div>
      </Surface>

      <Tabs defaultValue="profile" className="space-y-5">
        <TabsList className="grid h-auto grid-cols-3 rounded-[1.5rem] border border-white/55 bg-white/72 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
          <TabsTrigger value="profile" className="rounded-[1rem] py-2.5">Profile</TabsTrigger>
          <TabsTrigger value="security" className="rounded-[1rem] py-2.5">Security</TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-[1rem] py-2.5">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Surface>
            <SectionHeader title="Profile" />
            <form className="mt-6 space-y-5" onSubmit={submitProfile}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full name</label>
                  <Input
                    value={profile.name}
                    onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                    className="h-12 rounded-2xl border-black/8 bg-black/[0.02] px-4 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                    className="h-12 rounded-2xl border-black/8 bg-black/[0.02] px-4 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>
              </div>
              <Button type="submit" className="rounded-full bg-foreground px-5 text-background hover:opacity-90" disabled={profilePending}>
                {profilePending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Surface>
        </TabsContent>

        <TabsContent value="security">
          <Surface>
            <SectionHeader title="Security" />
            <form className="mt-6 space-y-5" onSubmit={submitPassword}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current password</label>
                <Input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(event) => setPasswords((current) => ({ ...current, currentPassword: event.target.value }))}
                  className="h-12 rounded-2xl border-black/8 bg-black/[0.02] px-4 dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New password</label>
                  <Input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(event) => setPasswords((current) => ({ ...current, newPassword: event.target.value }))}
                    className="h-12 rounded-2xl border-black/8 bg-black/[0.02] px-4 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm</label>
                  <Input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(event) => setPasswords((current) => ({ ...current, confirmPassword: event.target.value }))}
                    className="h-12 rounded-2xl border-black/8 bg-black/[0.02] px-4 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>
              </div>
              <div className="rounded-[1.4rem] border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <KeyRound className="h-4 w-4 text-primary" />
                  8+ chars, uppercase, lowercase, number
                </div>
              </div>
              <Button type="submit" className="rounded-full bg-foreground px-5 text-background hover:opacity-90" disabled={passwordPending}>
                {passwordPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Surface>
        </TabsContent>

        <TabsContent value="preferences">
          <Surface>
            <SectionHeader title="Preferences" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => savePreferences({ ...preferences, digestEmails: !preferences.digestEmails })}
                className="rounded-[1.5rem] border border-black/5 bg-black/[0.02] p-4 text-left transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <BellRing className="h-4 w-4 text-primary" />
                  Digest emails
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{preferences.digestEmails ? "On" : "Off"}</div>
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ ...preferences, dueReminders: !preferences.dueReminders })}
                className="rounded-[1.5rem] border border-black/5 bg-black/[0.02] p-4 text-left transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-primary" />
                  Due reminders
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{preferences.dueReminders ? "On" : "Off"}</div>
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ ...preferences, compactMode: !preferences.compactMode })}
                className="rounded-[1.5rem] border border-black/5 bg-black/[0.02] p-4 text-left transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  Compact mode
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{preferences.compactMode ? "On" : "Off"}</div>
              </button>
              <div className="rounded-[1.5rem] border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <UserRound className="h-4 w-4 text-primary" />
                  {user.role === ROLES.ADMIN ? "Admin mode" : "Reader mode"}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  {user.role === ROLES.ADMIN ? "Ops-first layout" : "Reader-first layout"}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label className="text-sm font-medium">Note</label>
              <Textarea
                value={preferences.workspaceNote}
                onChange={(event) => setPreferences((current) => ({ ...current, workspaceNote: event.target.value }))}
                placeholder="Optional note"
                className="min-h-28 rounded-[1.6rem] border-black/8 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-black/8 bg-white/75 dark:border-white/10 dark:bg-white/[0.04]"
                disabled={preferencesPending}
                onClick={() => savePreferences(preferences)}
              >
                {preferencesPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </Surface>
        </TabsContent>
      </Tabs>
    </div>
  );
}
