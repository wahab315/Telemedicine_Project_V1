import ResetPasswordPage from "@/module/auth/areas/reset-password/views";
import { AuthRoutes } from "@/module/auth/routes";

export const dynamic = "force-static";

export const metadata = {
  title: "Reset password",
  alternates: {
    canonical: AuthRoutes.resetPassword.toPath({})
  }
};

export default function Page() {
  return <ResetPasswordPage />;
}
