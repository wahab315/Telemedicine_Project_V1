import { IoHomeOutline } from "react-icons/io5";

import { AuthRoutes } from "@/module/auth/routes";

import { LaboratoryRoutes } from "../routes";

export const laboratoryShellRoutePaths = {
  portalRoot: LaboratoryRoutes.home.path,
  login: AuthRoutes.login.path,
  settings: LaboratoryRoutes.home.path
};

export const LABORATORY_SIDEBAR_NAV = [
  {
    sectionTitle: "Laboratory",
    items: [
      {
        label: "Home",
        href: LaboratoryRoutes.home.path,
        icon: IoHomeOutline
      }
    ]
  }
];
