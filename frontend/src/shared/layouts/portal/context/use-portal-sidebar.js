"use client";

import { useContext } from "react";

import { PortalSidebarContext } from "./portal-sidebar-context";

export function usePortalSidebar() {
  const ctx = useContext(PortalSidebarContext);
  if (!ctx) {
    throw new Error(
      "usePortalSidebar must be used within PortalSidebarProvider"
    );
  }
  return ctx;
}
