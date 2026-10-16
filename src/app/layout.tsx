import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TGB – The Good Biker | Find riders, routes & riding clubs in India",
    template: "%s | TGB – The Good Biker",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["motorcycle", "riding clubs", "bike routes India", "Leh Ladakh ride", "biker community", "motorcycle events"],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "TGB – The Good Biker",
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "TGB – The Good Biker", description: siteConfig.description },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#ff7723",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
