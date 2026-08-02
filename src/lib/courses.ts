import coursesFallback from "@/data/courses.json";
import { deriveCourses } from "@/lib/sheets/mappers";
import { getUniversities } from "@/lib/universities";

export interface Course {
  name: string;
  slug: string;
  icon: string;
  description: string;
  universities: string[];
}

export const POPULAR_COURSES = [
  { name: "BBA", slug: "bba", icon: "💼", description: "Business administration with practical management foundations" },
  { name: "BBS", slug: "bbs", icon: "📚", description: "Broad business studies for commerce and management careers" },
  { name: "MBA", slug: "mba", icon: "📊", description: "Postgraduate management with industry-focused specialisations" },
  { name: "B.Tech", slug: "b-tech", icon: "⚙️", description: "Engineering programs at top VTU and deemed universities" },
  { name: "B.Pharm", slug: "b-pharm", icon: "💊", description: "Pharmaceutical science at recognised Indian institutions" },
  { name: "Allied Health", slug: "allied-health", icon: "🔬", description: "Laboratory, imaging, physiotherapy and paramedical pathways" },
  { name: "GNM Nursing", slug: "gnm-nursing", icon: "🩺", description: "Diploma-level nursing education with supervised clinical training" },
  { name: "B.Sc Nursing", slug: "bsc-nursing", icon: "🎓", description: "Undergraduate nursing education with clinical practice" },
] as const;

const unsupportedCourse = (course: Course) => /^(mbbs|bds|md|ms)$/i.test(course.name.trim()) || /^(mbbs|bds|md|ms)$/i.test(course.slug);

export async function getCourses(): Promise<Course[]> {
  const bySlug = new Map<string, Course>();

  for (const rawCourse of coursesFallback as Course[]) {
    if (unsupportedCourse(rawCourse)) continue;
    const course = { ...rawCourse, name: rawCourse.name.replace(/\)+$/, "").trim() };
    const existing = bySlug.get(course.slug);
    bySlug.set(course.slug, existing
      ? { ...existing, universities: [...new Set([...existing.universities, ...course.universities])] }
      : course);
  }

  const liveCourses = deriveCourses(await getUniversities()).filter((course) => !unsupportedCourse(course));
  for (const liveCourse of liveCourses) {
    const existing = bySlug.get(liveCourse.slug);
    if (!existing) continue;
    bySlug.set(liveCourse.slug, {
      ...existing,
      universities: [...new Set([...existing.universities, ...liveCourse.universities])],
    });
  }

  for (const course of POPULAR_COURSES) {
    if (!bySlug.has(course.slug)) bySlug.set(course.slug, { ...course, universities: [] });
  }

  return [...bySlug.values()];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.slug === slug) ?? null;
}
