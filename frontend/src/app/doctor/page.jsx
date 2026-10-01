import DoctorHomePage from "@/doctor/pages/home";
import { DoctorRoutes } from "@/doctor/routes";

export const metadata = {
  title: "Doctor portal",
  alternates: {
    canonical: DoctorRoutes.home.toPath({})
  }
};

export default function Page() {
  return <DoctorHomePage />;
}
