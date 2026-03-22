"use client";

import { useState, useTransition } from "react";
import { BellRing, KeyRound, Shield, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROLE_LABELS, type AppRole } from "@/constants/roles";
import { SectionHeader, Surface } from "@/components/App/workspace-cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  function savePreferences(next: Preferences) {
    const key = `libraryhub-preferences-${user.id}`;
    startPreferencesTransition(() => {
      window.localStorage.setItem(key, JSON.stringify(next));
      setPreferences(next);
      toast.success("Preferences saved");
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
      toast.success("Profile updated");
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
      toast.success("Password updated");
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <Surface className="h-fit">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl font-semibold tracking-[-0.04em]">{user.name}</div>
            <div className="text-base text-muted-foreground">{user.email}</div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-[1.4rem] border bg-muted/50 p-4">
            <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Role</div>
            <div className="mt-2 text-base font-medium">{ROLE_LABELS[user.role]}</div>
          </div>
          <div className="rounded-[1.4rem] border bg-muted/50 p-4">
            <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Since</div>
            <div className="mt-2 text-base font-medium">{user.createdAt.toLocaleDateString()}</div>
          </div>
        </div>
      </Surface>

      <Tabs defaultValue="profile" className="space-y-5">
        <TabsList className="grid h-14 w-full grid-cols-3 rounded-2xl bg-muted/60 p-1.5">
          <TabsTrigger value="profile" className="rounded-xl py-2.5 text-base">Profile</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl py-2.5 text-base">Security</TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-xl py-2.5 text-base">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Surface>
            <SectionHeader title="Profile" description="Update your name and email address." />
            <form className="mt-6 space-y-5" onSubmit={submitProfile}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-12 rounded-xl text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-12 rounded-xl text-base"
                  />
                </div>
              </div>
              <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/92" disabled={profilePending}>
                {profilePending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Surface>
        </TabsContent>

        <TabsContent value="security">
          <Surface>
            <SectionHeader title="Security" description="Manage your password and account security settings." />
            <form className="mt-6 space-y-5" onSubmit={submitPassword}>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Current password</label>
                <Input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="h-12 rounded-xl text-base"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">New password</label>
                  <Input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="h-12 rounded-xl text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Confirm new password</label>
                  <Input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="h-12 rounded-xl text-base"
                  />
                </div>
              </div>
              <div className="rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <KeyRound className="h-5 w-5 text-primary" />
                  Password must contain 8+ characters, one uppercase, one lowercase, and one number.
                </div>
              </div>
              <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/92" disabled={passwordPending}>
                {passwordPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Surface>
        </TabsContent>

        <TabsContent value="preferences">
          <Surface>
            <SectionHeader title="Preferences" description="Customize your workspace and notification settings." />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { id: "digestEmails", label: "Digest emails", icon: BellRing },
                { id: "dueReminders", label: "Due reminders", icon: Shield },
                { id: "compactMode", label: "Compact mode", icon: SlidersHorizontal },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => savePreferences({ ...preferences, [id]: !preferences[id as keyof Preferences] })}
                  className="rounded-[1.2rem] border bg-muted/40 p-4 text-left transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-center gap-3 text-base font-semibold">
                    <Icon className="h-5 w-5 text-primary" />
                    {label}
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">{preferences[id as keyof Preferences] ? "On" : "Off"}</div>
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              <label className="text-sm font-semibold">Workspace Note</label>
              <Textarea
                value={preferences.workspaceNote}
                onChange={(e) => setPreferences({ ...preferences, workspaceNote: e.target.value })}
                placeholder="Leave a note for yourself in the workspace..."
                className="min-h-28 rounded-xl text-base"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                disabled={preferencesPending}
                onClick={() => savePreferences(preferences)}
              >
                {preferencesPending ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </Surface>
        </TabsContent>
      </Tabs>
    </div>
  );
}
