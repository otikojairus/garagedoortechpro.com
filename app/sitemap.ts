import type { MetadataRoute } from "next";
import { SEO_PAGES, getSiteUrl } from "@/lib/site-data";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/+$/, "").replace(/\.ca(?=\/|$)/, ".com");
  const now = new Date();

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = SEO_PAGES.map((page) => ({
    url: `${siteUrl}${page.pageSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.priority === "P1" ? 0.9 : page.priority === "P2" ? 0.8 : 0.76,
  }));

  const allRoutes = [...baseRoutes, ...pageRoutes];
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of allRoutes) {
    deduped.set(route.url, route);
  }

  return [...deduped.values()];
}
