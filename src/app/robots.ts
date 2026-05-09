import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tilen-tours.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
