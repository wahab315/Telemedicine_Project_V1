import { defineRoute } from "@core/router";

const CookiePolicy = defineRoute({
  path: "/cookie-policy",
  meta: { label: "Cookie Policy" }
});

const PrivacyPolicy = defineRoute({
  path: "/privacy-policy",
  meta: { label: "Privacy Policy" }
});

const TermsAndServices = defineRoute({
  path: "/terms-and-services",
  meta: { label: "Terms and Services" }
});

export const LegalRoutes = {
  cookiePolicy: CookiePolicy,
  privacyPolicy: PrivacyPolicy,
  termsAndServices: TermsAndServices
};
