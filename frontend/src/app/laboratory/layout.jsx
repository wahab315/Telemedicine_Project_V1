import LaboratoryPortalLayoutShell from "@/laboratory/layout/portal-layout-shell";

export const dynamic = "force-dynamic";

export default function LaboratoryRouteLayout({ children }) {
  return <LaboratoryPortalLayoutShell>{children}</LaboratoryPortalLayoutShell>;
}
