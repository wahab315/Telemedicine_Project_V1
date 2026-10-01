import { defineRoute } from "@core/router";

const Home = defineRoute({
  path: "/patient",
  meta: { label: "Patient portal" }
});

export const PatientRoutes = {
  home: Home
};
