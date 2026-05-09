import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tilen-tours.com";

const PAGES: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",         priority: 1.0, changeFreq: "weekly" },
  { path: "/book",    priority: 0.9, changeFreq: "weekly" },
  { path: "/privacy", priority: 0.3, changeFreq: "yearly" },
  { path: "/terms",   priority: 0.3, changeFreq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap(({ path, priority, changeFreq }) =>
    routing.locales.map((locale) => {
      const alt: Record<string, string> = {};
      for (const l of routing.locales) alt[l] = `${SITE_URL}/${l}${path}`;
      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: changeFreq,
        priority,
        alternates: { languages: alt },
      };
    })
  );
}
