import { defineRoute } from "@core/router";

const Home = defineRoute({
  path: "/doctor",
  meta: { label: "Doctor portal" }
});

export const DoctorRoutes = {
  home: Home
};
