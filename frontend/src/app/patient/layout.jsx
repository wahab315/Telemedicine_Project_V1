import PatientPortalLayoutShell from "@/patient/layout/portal-layout-shell";

export const dynamic = "force-dynamic";

export default function PatientRouteLayout({ children }) {
  return <PatientPortalLayoutShell>{children}</PatientPortalLayoutShell>;
}
