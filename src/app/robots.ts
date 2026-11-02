import type { MetadataRoute } from "next";
import { AI_CRAWLERS, SITE_URL } from "@/lib/geo";

// Everything public is crawlable by everyone, AI answer engines included -
// the explicit per-bot rules below say so unambiguously. Admin and API stay
// out of every index.
const DISALLOW = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
