import { defineRoute } from "@core/router";

const Home = defineRoute({
  path: "/pharmacy",
  meta: { label: "Pharmacy portal" }
});

export const PharmacyRoutes = {
  home: Home
};
