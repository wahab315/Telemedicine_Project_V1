import "@/styles/main.scss";

import { AppProviders } from "@core/providers/app-providers";
import localFont from "next/font/local";

import OfflineScreen from "@/shared/module/offline-page";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap"
});

export const metadata = {
  title: "Telemedicine",
  description: "Book doctor appointments online or in person.",
  icons: {
    icon: "/common/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ ...inter.style }}>
        <AppProviders overlays={<OfflineScreen />}>{children}</AppProviders>
      </body>
    </html>
  );
}
