import { MarketingRoutes } from "@/marketing/routes";
import PrivacyPolicyPage from "@/module/marketing/pages/privacy-policy";

export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: MarketingRoutes.legal.privacyPolicy.toPath({})
  }
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
