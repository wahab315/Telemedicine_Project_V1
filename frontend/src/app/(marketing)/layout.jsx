import MarketingLayout from "@/marketing/layout/marketing-layout";
import { AuthRoutes } from "@/module/auth/routes";

export default function MarketingRouteLayout({ children }) {
  return (
    <MarketingLayout loginHref={AuthRoutes.login.toPath({})}>
      {children}
    </MarketingLayout>
  );
}
