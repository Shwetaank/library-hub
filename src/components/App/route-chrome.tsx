"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const workspacePrefixes = ["/settings"];

function useIsWorkspaceRoute() {
  const pathname = usePathname();
  return workspacePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function RouteHeader() {
  const isWorkspaceRoute = useIsWorkspaceRoute();

  if (isWorkspaceRoute) {
    return null;
  }

  return <Header />;
}

export function RouteFooter() {
  const isWorkspaceRoute = useIsWorkspaceRoute();

  if (isWorkspaceRoute) {
    return null;
  }

  return <Footer />;
}
