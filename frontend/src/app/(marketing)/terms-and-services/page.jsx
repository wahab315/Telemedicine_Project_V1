import { MarketingRoutes } from "@/marketing/routes";
import TermsAndServicesPage from "@/module/marketing/pages/terms-and-services";

export const dynamic = "force-static";

export const metadata = {
  title: "Terms and Services",
  alternates: {
    canonical: MarketingRoutes.legal.termsAndServices.toPath({})
  }
};

export default function Page() {
  return <TermsAndServicesPage />;
}
