import DoctorPortalLayoutShell from "@/doctor/layout/portal-layout-shell";

export const dynamic = "force-dynamic";

export default function DoctorRouteLayout({ children }) {
  return <DoctorPortalLayoutShell>{children}</DoctorPortalLayoutShell>;
}
