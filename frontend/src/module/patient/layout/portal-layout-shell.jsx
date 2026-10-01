"use client";

import PortalLayout from "@/layouts/portal";

import {
  PATIENT_SIDEBAR_NAV,
  patientShellRoutePaths
} from "./portal-shell-config";

export default function PatientPortalLayoutShell({ children }) {
  return (
    <PortalLayout
      navSections={PATIENT_SIDEBAR_NAV}
      routePaths={patientShellRoutePaths}
    >
      {children}
    </PortalLayout>
  );
}
