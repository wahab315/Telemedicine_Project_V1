import { MarketingRoutes } from "../routes";

export const footerNavSections = [
  {
    title: "Company",
    links: [
      { label: "Home", href: MarketingRoutes.home.toPath({}) },
      { label: "Contact", href: MarketingRoutes.contact.toPath({}) }
    ]
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: MarketingRoutes.legal.privacyPolicy.toPath({})
      },
      {
        label: "Terms and Services",
        href: MarketingRoutes.legal.termsAndServices.toPath({})
      },
      {
        label: "Cookie Policy",
        href: MarketingRoutes.legal.cookiePolicy.toPath({})
      }
    ]
  }
];
