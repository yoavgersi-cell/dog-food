import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import { organizationSchema, webSiteSchema } from "@/lib/geo";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FEF3C7" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Dog Food Scout - Fresh & Raw Dog Food Compared on Real Nutrition Data",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Independent comparisons of fresh, raw and premium dog food delivery brands: dry-matter nutrients, cost per day by weight, AAFCO compliance and plan flexibility.",
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: SITE_URL },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL, languages: { "en-US": SITE_URL, "x-default": SITE_URL } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {/* One Organization + WebSite entity (stable @ids) referenced by every page - see src/lib/geo.ts */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
