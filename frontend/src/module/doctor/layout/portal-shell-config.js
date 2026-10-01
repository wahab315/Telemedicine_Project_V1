import { IoHomeOutline } from "react-icons/io5";

import { AuthRoutes } from "@/module/auth/routes";

import { DoctorRoutes } from "../routes";

export const doctorShellRoutePaths = {
  portalRoot: DoctorRoutes.home.path,
  login: AuthRoutes.login.path,
  settings: DoctorRoutes.home.path
};

export const DOCTOR_SIDEBAR_NAV = [
  {
    sectionTitle: "Doctor",
    items: [
      {
        label: "Home",
        href: DoctorRoutes.home.path,
        icon: IoHomeOutline
      }
    ]
  }
];
