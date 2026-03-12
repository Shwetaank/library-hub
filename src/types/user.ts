import type { AppRole } from "@/constants/roles";

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: AppRole;
  createdAt: string | Date;
  avatar?: string;
}
