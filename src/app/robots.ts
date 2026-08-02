import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/constants";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  return {
    rules: settings.robotsIndex
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
