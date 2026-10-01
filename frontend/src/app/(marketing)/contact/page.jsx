import { MarketingRoutes } from "@/marketing/routes";
import ContactPage from "@/module/marketing/pages/contact";

export const dynamic = "force-static";

export const metadata = {
  title: "Contact",
  description: "Contact the telemedicine team.",
  alternates: {
    canonical: MarketingRoutes.contact.toPath({})
  }
};

export default function Page() {
  return <ContactPage />;
}
