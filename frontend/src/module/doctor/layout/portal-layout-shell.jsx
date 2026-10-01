"use client";

import PortalLayout from "@/layouts/portal";

import { DOCTOR_SIDEBAR_NAV, doctorShellRoutePaths } from "./portal-shell-config";

export default function DoctorPortalLayoutShell({ children }) {
  return (
    <PortalLayout
      navSections={DOCTOR_SIDEBAR_NAV}
      routePaths={doctorShellRoutePaths}
    >
      {children}
    </PortalLayout>
  );
}
