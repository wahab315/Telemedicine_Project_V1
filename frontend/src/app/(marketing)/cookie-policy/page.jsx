import { MarketingRoutes } from "@/marketing/routes";
import CookiePolicyPage from "@/module/marketing/pages/cookie-policy";

export const dynamic = "force-static";

export const metadata = {
  title: "Cookie Policy",
  alternates: {
    canonical: MarketingRoutes.legal.cookiePolicy.toPath({})
  }
};

export default function Page() {
  return <CookiePolicyPage />;
}
