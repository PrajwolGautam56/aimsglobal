import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blogs";
import { getCourses } from "@/lib/courses";
import { SITE_URL } from "@/lib/constants";
import { getUniversities } from "@/lib/universities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [universities, blogs, courses] = await Promise.all([
    getUniversities(),
    getPublishedBlogPosts(),
    getCourses(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/universities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const uniUrls = universities.map((u) => ({
    url: `${SITE_URL}/universities/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const courseUrls = courses.map((c) => ({
    url: `${SITE_URL}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...uniUrls, ...blogUrls, ...courseUrls];
}
