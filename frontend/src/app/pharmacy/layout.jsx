import PharmacyPortalLayoutShell from "@/pharmacy/layout/portal-layout-shell";

export const dynamic = "force-dynamic";

export default function PharmacyRouteLayout({ children }) {
  return <PharmacyPortalLayoutShell>{children}</PharmacyPortalLayoutShell>;
}
