import SigninPage from "@/module/auth/areas/signin/views";
import { AuthRoutes } from "@/module/auth/routes";

export const dynamic = "force-static";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your telemedicine account.",
  alternates: {
    canonical: AuthRoutes.login.toPath({})
  }
};

export default function Page() {
  return <SigninPage />;
}
