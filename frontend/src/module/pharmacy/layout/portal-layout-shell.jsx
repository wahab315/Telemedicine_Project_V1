"use client";

import PortalLayout from "@/layouts/portal";

import {
  PHARMACY_SIDEBAR_NAV,
  pharmacyShellRoutePaths
} from "./portal-shell-config";

export default function PharmacyPortalLayoutShell({ children }) {
  return (
    <PortalLayout
      navSections={PHARMACY_SIDEBAR_NAV}
      routePaths={pharmacyShellRoutePaths}
    >
      {children}
    </PortalLayout>
  );
}
