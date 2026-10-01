import { IoHomeOutline } from "react-icons/io5";

import { AuthRoutes } from "@/module/auth/routes";

import { PharmacyRoutes } from "../routes";

export const pharmacyShellRoutePaths = {
  portalRoot: PharmacyRoutes.home.path,
  login: AuthRoutes.login.path,
  settings: PharmacyRoutes.home.path
};

export const PHARMACY_SIDEBAR_NAV = [
  {
    sectionTitle: "Pharmacy",
    items: [
      {
        label: "Home",
        href: PharmacyRoutes.home.path,
        icon: IoHomeOutline
      }
    ]
  }
];
