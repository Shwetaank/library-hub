"use client";

import { useAuthContext } from "@/components/auth-provider";

// Re-exporting the context hook with a more conventional name
// to be used throughout the application.
export const useAuth = () => {
  return useAuthContext();
};
