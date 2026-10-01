import PatientHomePage from "@/patient/pages/home";
import { PatientRoutes } from "@/patient/routes";

export const metadata = {
  title: "Patient portal",
  alternates: {
    canonical: PatientRoutes.home.toPath({})
  }
};

export default function Page() {
  return <PatientHomePage />;
}
