import { MarketingRoutes } from "../routes";

export const navbarData = [
  {
    title: "Home",
    link: MarketingRoutes.home.toPath({})
  },
  {
    title: "Contact",
    link: MarketingRoutes.contact.toPath({})
  }
];
