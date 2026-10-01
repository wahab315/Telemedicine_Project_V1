import { IoHomeOutline } from "react-icons/io5";

import { AuthRoutes } from "@/module/auth/routes";

import { PatientRoutes } from "../routes";

export const patientShellRoutePaths = {
  portalRoot: PatientRoutes.home.path,
  login: AuthRoutes.login.path,
  settings: PatientRoutes.home.path
};

export const PATIENT_SIDEBAR_NAV = [
  {
    sectionTitle: "Patient",
    items: [
      {
        label: "Home",
        href: PatientRoutes.home.path,
        icon: IoHomeOutline
      }
    ]
  }
];
