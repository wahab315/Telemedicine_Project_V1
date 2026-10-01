import { defineRoute } from "@core/router";

import { LegalRoutes } from "./legal.routes";

const Home = defineRoute({
  path: "/",
  meta: { label: "Home" }
});

const Contact = defineRoute({
  path: "/contact",
  meta: { label: "Contact" }
});

export const MarketingRoutes = {
  home: Home,
  contact: Contact,
  legal: LegalRoutes
};
