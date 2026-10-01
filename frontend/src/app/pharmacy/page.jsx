import PharmacyHomePage from "@/pharmacy/pages/home";
import { PharmacyRoutes } from "@/pharmacy/routes";

export const metadata = {
  title: "Pharmacy portal",
  alternates: {
    canonical: PharmacyRoutes.home.toPath({})
  }
};

export default function Page() {
  return <PharmacyHomePage />;
}
