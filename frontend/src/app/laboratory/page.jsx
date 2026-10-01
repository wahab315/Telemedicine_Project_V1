import LaboratoryHomePage from "@/laboratory/pages/home";
import { LaboratoryRoutes } from "@/laboratory/routes";

export const metadata = {
  title: "Laboratory portal",
  alternates: {
    canonical: LaboratoryRoutes.home.toPath({})
  }
};

export default function Page() {
  return <LaboratoryHomePage />;
}
