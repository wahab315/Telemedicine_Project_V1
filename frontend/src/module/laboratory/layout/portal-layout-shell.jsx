"use client";

import PortalLayout from "@/layouts/portal";

import {
  LABORATORY_SIDEBAR_NAV,
  laboratoryShellRoutePaths
} from "./portal-shell-config";

export default function LaboratoryPortalLayoutShell({ children }) {
  return (
    <PortalLayout
      navSections={LABORATORY_SIDEBAR_NAV}
      routePaths={laboratoryShellRoutePaths}
    >
      {children}
    </PortalLayout>
  );
}
