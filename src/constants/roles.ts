export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<AppRole, string> = {
  ADMIN: "Administrator",
  USER: "Member",
};
