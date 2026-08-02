import blogsFallback from "@/data/blogs.json";
import { getMongoBlogs } from "@/lib/cms";
import { hasMongoConfig } from "@/lib/mongodb";

export interface BlogPost {
  title: string;
  image: string | null;
  imgAlt: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string;
  category: string;
  tags: string[];
  targetAudience: string;
  wordCount: number;
  outline: string;
  internalLinks: string;
  status: string;
  priority: string;
  notes: string;
  author: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
  featured: boolean;
  content: string;
}

function mergeBlogs(base: BlogPost[], overrides: BlogPost[]): BlogPost[] {
  const bySlug = new Map(base.map((post) => [post.slug, post]));
  for (const post of overrides) bySlug.set(post.slug, post);
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fallback = blogsFallback as BlogPost[];

  if (hasMongoConfig()) {
    const mongoData = await getMongoBlogs();
    if (mongoData?.length) return mergeBlogs(fallback, mongoData);
  }

  return fallback;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((p) => p.status.toLowerCase().includes("ready") || p.status.toLowerCase() === "published");
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);

  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : 0;
      const bScore = b.category === current.category ? 2 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export const BLOG_CATEGORIES = [
  "All",
  "Study Abroad Guide",
  "Engineering",
  "Pharmacy & Allied Health",
  "Nursing",
  "Management",
  "Comparison",
  "Tips & Safety",
  "University Guide",
  "City Guide",
  "Rankings & Lists",
] as const;
