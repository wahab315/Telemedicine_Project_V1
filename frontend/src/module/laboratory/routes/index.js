import { defineRoute } from "@core/router";

const Home = defineRoute({
  path: "/laboratory",
  meta: { label: "Laboratory portal" }
});

export const LaboratoryRoutes = {
  home: Home
};
