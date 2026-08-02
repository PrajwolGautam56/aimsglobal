import type { BlogPost } from "@/lib/blogs";
import { hasMongoConfig, getCollection } from "@/lib/mongodb";
import type { University } from "@/lib/university-shared";
import siteSettingsFallback from "@/data/site-settings.json";

export type SeoScore = {
  score: number;
  checks: Array<{ label: string; passed: boolean; hint: string }>;
};

export type SiteSettings = {
  title: string;
  description: string;
  keywords: string;
  robotsIndex: boolean;
  updatedAt?: string;
};

type Stored<T> = T & {
  createdAt?: string;
  updatedAt?: string;
};

function stripMongoId<T extends object>(doc: T & { _id?: unknown }): T {
  const { _id, ...rest } = doc;
  void _id;
  return rest as T;
}

export async function getMongoUniversities(): Promise<University[] | null> {
  if (!hasMongoConfig()) return null;
  try {
    const collection = await getCollection<Stored<University>>("universities");
    const docs = await collection.find({}).sort({ isFeatured: -1, name: 1 }).toArray();
    return docs.map(stripMongoId);
  } catch (error) {
    console.error("Mongo universities fetch failed:", error);
    return null;
  }
}

export async function getMongoBlogs(): Promise<BlogPost[] | null> {
  if (!hasMongoConfig()) return null;
  try {
    const collection = await getCollection<Stored<BlogPost>>("blogs");
    const docs = await collection.find({}).sort({ publishedAt: -1, title: 1 }).toArray();
    return docs.map(stripMongoId);
  } catch (error) {
    console.error("Mongo blogs fetch failed:", error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback = siteSettingsFallback as SiteSettings;

  if (!hasMongoConfig()) return fallback;
  try {
    const collection = await getCollection<SiteSettings>("siteSettings");
    const doc = await collection.findOne({ title: { $exists: true } });
    return doc ? stripMongoId(doc) : fallback;
  } catch (error) {
    console.error("Mongo site settings fetch failed:", error);
    return fallback;
  }
}

export function scoreSeo(input: {
  title?: string;
  description?: string;
  slug?: string;
  focusKeyword?: string;
  content?: string;
}): SeoScore {
  const title = input.title?.trim() || "";
  const description = input.description?.trim() || "";
  const slug = input.slug?.trim() || "";
  const keyword = input.focusKeyword?.trim().toLowerCase() || "";
  const content = input.content?.trim() || "";

  const checks = [
    {
      label: "SEO title length",
      passed: title.length >= 35 && title.length <= 65,
      hint: "Keep the title around 35-65 characters.",
    },
    {
      label: "Meta description length",
      passed: description.length >= 120 && description.length <= 160,
      hint: "Best descriptions are around 120-160 characters.",
    },
    {
      label: "Clean URL slug",
      passed: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),
      hint: "Use lowercase words separated by hyphens.",
    },
    {
      label: "Keyword in title",
      passed: Boolean(keyword && title.toLowerCase().includes(keyword)),
      hint: "Use the focus keyword naturally in the title.",
    },
    {
      label: "Keyword in description",
      passed: Boolean(keyword && description.toLowerCase().includes(keyword)),
      hint: "Mention the focus keyword once in the meta description.",
    },
    {
      label: "Content depth",
      passed: content.split(/\s+/).filter(Boolean).length >= 300,
      hint: "Aim for at least 300 words for indexable pages.",
    },
  ];

  return {
    score: Math.round((checks.filter((check) => check.passed).length / checks.length) * 100),
    checks,
  };
}
