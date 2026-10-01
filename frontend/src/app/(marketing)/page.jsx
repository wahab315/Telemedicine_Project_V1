import { MarketingRoutes } from "@/marketing/routes";
import HomePage from "@/module/marketing/pages/home";

export const dynamic = "force-static";

export const metadata = {
  title: "Telemedicine | Healthcare appointments",
  description:
    "Book doctor appointments online or in person with our medical platform.",
  alternates: {
    canonical: MarketingRoutes.home.toPath({})
  }
};

export default function Page() {
  return <HomePage />;
}
