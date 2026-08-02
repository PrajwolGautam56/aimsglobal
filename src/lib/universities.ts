import universitiesFallback from "@/data/universities.json";
import { getMongoUniversities } from "@/lib/cms";
import { hasMongoConfig } from "@/lib/mongodb";
import type { University } from "@/lib/university-shared";
export type { CourseFee, University } from "@/lib/university-shared";

export type UniversityFilters = {
  search?: string;
  state?: string;
  courseType?: string;
  budget?: string;
  sort?: "ranking" | "name" | "fees";
};

const COURSE_TYPE_KEYWORDS: Record<string, string[]> = {
  Engineering: ["b.tech", "b.e.", "m.tech", "engineering", "cse", "ece"],
  "Health & Allied": ["nursing", "pharm", "paramedical", "allied", "physiotherapy", "gnm"],
  Management: ["mba", "bba", "mca", "management"],
  Law: ["law", "llb"],
  Design: ["design", "architecture"],
};

const unsupportedCourse = /\b(?:MBBS|BDS)\b/i;

function forSupportedServices(university: University): University {
  const popularCourses = university.popularCourses.filter((course) => !unsupportedCourse.test(course));
  const coursesFees = university.coursesFees.filter((row) => !unsupportedCourse.test(row.course));
  const documentsRequired = university.documentsRequired.filter(
    (document) => !/NEET|medical courses/i.test(document)
  );

  const hasUnsupportedMarketing = [
    university.metaTitle,
    university.metaDescription,
    university.keyHighlights,
    university.overview,
  ].some((value) => unsupportedCourse.test(value));

  return {
    ...university,
    popularCourses,
    coursesFees,
    documentsRequired,
    metaTitle: university.metaTitle.replace(/\b2025\b/g, "2026"),
    metaDescription: university.metaDescription.replace(/\b2025\b/g, "2026"),
    topCourse: unsupportedCourse.test(university.topCourse)
      ? popularCourses[0] || "Contact for supported courses"
      : university.topCourse,
    ...(hasUnsupportedMarketing && {
      metaTitle: `${university.name} Admission 2026 - Courses & Fees`,
      metaDescription: `Explore supported courses, fees, eligibility and admission details for ${university.name} with guidance for Nepali students.`,
      keyHighlights: popularCourses.length
        ? `Supported study options include ${popularCourses.slice(0, 6).join(", ")}.`
        : "Contact AIMS Global for currently supported study options.",
      overview: `${university.name} is located in ${university.city}, ${university.state}. Compare currently supported courses, fees, eligibility and admission requirements before applying.`,
    }),
  };
}

function mergeUniversities(base: University[], overrides: University[]): University[] {
  const bySlug = new Map(base.map((university) => [university.slug, university]));
  for (const university of overrides) bySlug.set(university.slug, university);
  return [...bySlug.values()];
}

function parseFeeMin(fees: string): number {
  const match = fees.match(/₹?([\d.]+)\s*([kKlL])/);
  if (!match) return 999;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "l" ? value : value / 100;
}

function matchesCourseType(uni: University, courseType: string): boolean {
  if (courseType === "All") return true;
  const keywords = COURSE_TYPE_KEYWORDS[courseType] || [];
  const haystack = uni.popularCourses.join(" ").toLowerCase();
  return keywords.some((kw) => haystack.includes(kw));
}

function matchesBudget(uni: University, budget: string): boolean {
  if (budget === "All") return true;
  const min = parseFeeMin(uni.annualFees);
  if (budget === "Under ₹2L") return min < 2;
  if (budget === "₹2L-₹5L") return min >= 2 && min <= 5;
  if (budget === "₹5L+") return min > 5;
  return true;
}

export async function getAllUniversities(): Promise<University[]> {
  const fallback = universitiesFallback as University[];

  if (hasMongoConfig()) {
    const mongoData = await getMongoUniversities();
    if (mongoData?.length) return mergeUniversities(fallback, mongoData);
  }

  return fallback;
}

export async function getUniversities(): Promise<University[]> {
  const data = await getAllUniversities();
  return data.filter((u) => u.status === "Active").map(forSupportedServices);
}

export async function getFeaturedUniversities(limit = 8): Promise<University[]> {
  const all = await getUniversities();
  const featured = all.filter((u) => u.isFeatured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getUniversityBySlug(slug: string): Promise<University | null> {
  const universities = await getUniversities();
  return universities.find((u) => u.slug === slug) ?? null;
}

export async function getUniversityBySlugForAdmin(slug: string): Promise<University | null> {
  const universities = await getAllUniversities();
  return universities.find((university) => university.slug === slug) ?? null;
}

export async function filterUniversities(filters: UniversityFilters): Promise<University[]> {
  let results = await getUniversities();
  const search = filters.search?.toLowerCase().trim();

  if (search) {
    results = results.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.city.toLowerCase().includes(search) ||
        u.state.toLowerCase().includes(search) ||
        u.popularCourses.some((c) => c.toLowerCase().includes(search))
    );
  }

  if (filters.state && filters.state !== "All") {
    results = results.filter((u) => u.state.toLowerCase().includes(filters.state!.toLowerCase()));
  }

  if (filters.courseType) {
    results = results.filter((u) => matchesCourseType(u, filters.courseType!));
  }

  if (filters.budget) {
    results = results.filter((u) => matchesBudget(u, filters.budget!));
  }

  if (filters.sort === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === "fees") {
    results.sort((a, b) => parseFeeMin(a.annualFees) - parseFeeMin(b.annualFees));
  }

  return results;
}
