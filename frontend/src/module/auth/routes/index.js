import { defineRoute } from "@core/router";

const Login = defineRoute({
  path: "/login",
  meta: { label: "Sign in" }
});

const ForgotPassword = defineRoute({
  path: "/forgot-password",
  meta: { label: "Forgot password" }
});

const ResetPassword = defineRoute({
  path: "/reset-password",
  meta: { label: "Reset password" }
});

export const AuthRoutes = {
  login: Login,
  forgotPassword: ForgotPassword,
  resetPassword: ResetPassword
};
