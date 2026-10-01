import ForgotPasswordPage from "@/module/auth/areas/forgot-password/views";
import { AuthRoutes } from "@/module/auth/routes";

export const dynamic = "force-static";

export const metadata = {
  title: "Forgot password",
  alternates: {
    canonical: AuthRoutes.forgotPassword.toPath({})
  }
};

export default function Page() {
  return <ForgotPasswordPage />;
}
