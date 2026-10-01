import MarketingShell from "@/layouts/marketing";
import { MarketingRoutes } from "@/marketing/routes";

import { footerNavSections } from "../content/content.footer";
import { navbarData } from "../content/content.navbar";

export default function MarketingLayout({ children, loginHref }) {
  return (
    <MarketingShell
      brandHref={MarketingRoutes.home.toPath({})}
      footerNavSections={footerNavSections}
      loginHref={loginHref}
      navbarData={navbarData}
    >
      {children}
    </MarketingShell>
  );
}
