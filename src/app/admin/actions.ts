"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { clearAdminSession, isAdminAuthenticated, setAdminSession } from "@/lib/admin-auth";
import { getCollection, hasMongoConfig } from "@/lib/mongodb";
import type { BlogPost } from "@/lib/blogs";
import type { University } from "@/lib/universities";
import { scoreSeo, type SiteSettings } from "@/lib/cms";

const list = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const bool = (value: FormDataEntryValue | null) => value === "on" || value === "true" || value === "yes";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

const dataFile = (fileName: string) => path.join(process.cwd(), "src", "data", fileName);

async function readJsonArray<T>(fileName: string): Promise<T[]> {
  const raw = await fs.readFile(dataFile(fileName), "utf8");
  return JSON.parse(raw) as T[];
}

async function writeJson(fileName: string, data: unknown) {
  await fs.writeFile(dataFile(fileName), `${JSON.stringify(data, null, 2)}\n`);
}

async function upsertLocalBySlug<T extends { slug: string }>(fileName: string, item: T) {
  const items = await readJsonArray<T>(fileName);
  const index = items.findIndex((existing) => existing.slug === item.slug);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }
  await writeJson(fileName, items);
}

const universitySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  city: z.string().min(1),
  state: z.string().min(1),
  type: z.string().min(1),
  image: z.string().nullable(),
  imgAlt: z.string().min(1),
  naacGrade: z.string(),
  nirfRanking: z.string(),
  popularCourses: z.array(z.string()),
  annualFees: z.string(),
  feeBasis: z.string().optional(),
  feeUpdatedAt: z.string().optional(),
  feeSource: z.string().optional(),
  feeSourceUrl: z.string().optional(),
  feeNotes: z.array(z.string()).optional(),
  highestPackage: z.string(),
  keyHighlights: z.string(),
  officialWebsite: z.string(),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(40),
  isFeatured: z.boolean(),
  status: z.string(),
  established: z.string(),
  topCourse: z.string(),
  overview: z.string(),
  admissionSteps: z.array(z.string()),
  documentsRequired: z.array(z.string()),
  placements: z.object({
    averagePackage: z.string(),
    highestPackage: z.string(),
    recruiters: z.array(z.string()),
  }),
  coursesFees: z.array(
    z.object({
      course: z.string(),
      duration: z.string(),
      annualFee: z.string(),
      feeBasis: z.string().optional(),
      inclusions: z.string().optional(),
      eligibility: z.string(),
      entranceExam: z.string(),
      notes: z.string().optional(),
    })
  ),
});

const blogSchema = z.object({
  title: z.string().min(5),
  image: z.string().nullable(),
  imgAlt: z.string(),
  slug: z.string().min(2),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(40),
  focusKeyword: z.string(),
  secondaryKeywords: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  targetAudience: z.string(),
  wordCount: z.number(),
  outline: z.string(),
  internalLinks: z.string(),
  status: z.string(),
  priority: z.string(),
  notes: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
  excerpt: z.string(),
  featured: z.boolean(),
  content: z.string(),
});

function parseCourseFees(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((item) => item.trim());
      const expanded = parts.length >= 8;
      const [course, duration, annualFee] = parts;
      const feeBasis = expanded ? parts[3] : "";
      const inclusions = expanded ? parts[4] : "";
      const eligibility = expanded ? parts[5] : parts[3];
      const entranceExam = expanded ? parts[6] : parts[4];
      const notes = expanded ? parts[7] : "";
      return {
        course: course || "Course",
        duration: duration || "Contact for details",
        annualFee: annualFee || "Contact for fees",
        feeBasis,
        inclusions,
        eligibility: eligibility || "Contact for eligibility",
        entranceExam: entranceExam || "Merit / University Entrance",
        notes,
      };
    });
}

function universityFromForm(formData: FormData): University {
  const popularCourses = list(formData.get("popularCourses"));
  const highestPackage = String(formData.get("highestPackage") || "—");
  const parsed = universitySchema.parse({
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    city: String(formData.get("city") || ""),
    state: String(formData.get("state") || ""),
    type: String(formData.get("type") || ""),
    image: String(formData.get("image") || "").trim() || null,
    imgAlt: String(formData.get("imgAlt") || `${formData.get("name")} logo`),
    naacGrade: String(formData.get("naacGrade") || "—"),
    nirfRanking: String(formData.get("nirfRanking") || "—"),
    popularCourses,
    annualFees: String(formData.get("annualFees") || ""),
    feeBasis: String(formData.get("feeBasis") || ""),
    feeUpdatedAt: String(formData.get("feeUpdatedAt") || ""),
    feeSource: String(formData.get("feeSource") || ""),
    feeSourceUrl: String(formData.get("feeSourceUrl") || ""),
    feeNotes: list(formData.get("feeNotes")),
    highestPackage,
    keyHighlights: String(formData.get("keyHighlights") || ""),
    officialWebsite: String(formData.get("officialWebsite") || ""),
    metaTitle: String(formData.get("metaTitle") || ""),
    metaDescription: String(formData.get("metaDescription") || ""),
    isFeatured: bool(formData.get("isFeatured")),
    status: String(formData.get("status") || "Active"),
    established: String(formData.get("established") || "—"),
    topCourse: String(formData.get("topCourse") || popularCourses[0] || "—"),
    overview: String(formData.get("overview") || ""),
    admissionSteps: list(formData.get("admissionSteps")),
    documentsRequired: list(formData.get("documentsRequired")),
    placements: {
      averagePackage: String(formData.get("averagePackage") || (highestPackage !== "—" ? `Up to ${highestPackage}` : "Contact for details")),
      highestPackage,
      recruiters: list(formData.get("recruiters")),
    },
    coursesFees: parseCourseFees(String(formData.get("coursesFees") || "")),
  });
  return parsed;
}

function blogFromForm(formData: FormData): BlogPost {
  const wordCount = Number(formData.get("wordCount") || "1200");
  const content = String(formData.get("content") || "");
  const parsed = blogSchema.parse({
    title: String(formData.get("title") || ""),
    image: String(formData.get("image") || "").trim() || null,
    imgAlt: String(formData.get("imgAlt") || formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    metaTitle: String(formData.get("metaTitle") || ""),
    metaDescription: String(formData.get("metaDescription") || ""),
    focusKeyword: String(formData.get("focusKeyword") || ""),
    secondaryKeywords: String(formData.get("secondaryKeywords") || ""),
    category: String(formData.get("category") || "Study Abroad Guide"),
    tags: list(formData.get("tags")),
    targetAudience: String(formData.get("targetAudience") || "Nepali students"),
    wordCount,
    outline: String(formData.get("outline") || ""),
    internalLinks: String(formData.get("internalLinks") || ""),
    status: String(formData.get("status") || "Draft"),
    priority: String(formData.get("priority") || "Medium"),
    notes: String(formData.get("notes") || ""),
    author: String(formData.get("author") || "AIMS Global Team"),
    publishedAt: String(formData.get("publishedAt") || new Date().toISOString().slice(0, 10)),
    readTime: Math.max(1, Math.round(wordCount / 200)),
    excerpt: String(formData.get("excerpt") || formData.get("metaDescription") || ""),
    featured: bool(formData.get("featured")),
    content,
  });
  return parsed;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail || !process.env.ADMIN_PASSWORD || email !== adminEmail || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveUniversityAction(formData: FormData) {
  await requireAdmin();
  const university = universityFromForm(formData);
  if (hasMongoConfig()) {
    const now = new Date().toISOString();
    const collection = await getCollection<University & { updatedAt?: string; createdAt?: string }>("universities");
    await collection.updateOne(
      { slug: university.slug },
      { $set: { ...university, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
  } else {
    await upsertLocalBySlug("universities.json", university);
  }
  revalidatePath("/", "layout");
  redirect("/admin/universities");
}

export async function saveBlogAction(formData: FormData) {
  await requireAdmin();
  const blog = blogFromForm(formData);
  if (hasMongoConfig()) {
    const now = new Date().toISOString();
    const collection = await getCollection<BlogPost & { updatedAt?: string; createdAt?: string }>("blogs");
    await collection.updateOne(
      { slug: blog.slug },
      { $set: { ...blog, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
  } else {
    await upsertLocalBySlug("blogs.json", blog);
  }
  revalidatePath("/", "layout");
  redirect("/admin/blogs");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings: SiteSettings = {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    keywords: String(formData.get("keywords") || ""),
    robotsIndex: bool(formData.get("robotsIndex")),
    updatedAt: new Date().toISOString(),
  };
  if (hasMongoConfig()) {
    const collection = await getCollection<SiteSettings>("siteSettings");
    await collection.updateOne({}, { $set: settings }, { upsert: true });
  } else {
    await writeJson("site-settings.json", settings);
  }
  revalidatePath("/", "layout");
  redirect("/admin/seo");
}

export async function previewSeoScoreAction(formData: FormData) {
  return scoreSeo({
    title: String(formData.get("metaTitle") || formData.get("title") || ""),
    description: String(formData.get("metaDescription") || ""),
    slug: String(formData.get("slug") || ""),
    focusKeyword: String(formData.get("focusKeyword") || ""),
    content: String(formData.get("content") || formData.get("overview") || ""),
  });
}
