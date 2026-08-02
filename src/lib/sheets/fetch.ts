import universitiesFallback from "@/data/universities.json";
import blogsFallback from "@/data/blogs.json";
import type { BlogPost } from "@/lib/blogs";
import type { Course } from "@/lib/courses";
import type { University } from "@/lib/university-shared";
import { parseCSV, rowsToObjects } from "@/lib/sheets/csv";
import { deriveCourses, mapBlog, mapUniversity } from "@/lib/sheets/mappers";
import { getUniversityLogoPath } from "@/lib/university-logos";

const UNIVERSITIES_SHEET_ID =
  process.env.GOOGLE_SHEETS_UNIVERSITIES_ID || "1ZprLoN1DLFzAUJndWm0DLCPWCo6WmXwCIsqWezeEi-M";
const BLOG_SHEET_ID =
  process.env.GOOGLE_SHEETS_BLOG_ID || "1e8cCwonGxlVySebx8h1JhwVj3reg-WnxGtglP7e0Jp4";

const REVALIDATE_SECONDS = Number(process.env.SHEETS_REVALIDATE_SECONDS || "300");

function sheetCsvUrl(spreadsheetId: string, gid?: string) {
  const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
  return gid ? `${base}&gid=${gid}` : base;
}

async function fetchSheetCsv(spreadsheetId: string, gid?: string): Promise<string> {
  const url = sheetCsvUrl(spreadsheetId, gid);
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: "text/csv" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Google Sheet ${spreadsheetId}: ${res.status}`);
  }

  return res.text();
}

export async function fetchUniversitiesFromSheet(): Promise<University[]> {
  try {
    const csv = await fetchSheetCsv(
      UNIVERSITIES_SHEET_ID,
      process.env.GOOGLE_SHEETS_UNIVERSITIES_GID
    );
    return rowsToObjects(parseCSV(csv)).map(mapUniversity);
  } catch (error) {
    console.error("Google Sheets universities fetch failed, using fallback JSON:", error);
    return (universitiesFallback as University[]).map((u) => ({
      ...u,
      image: u.image ?? getUniversityLogoPath(u.slug),
      imgAlt: u.imgAlt ?? `${u.name} logo`,
    }));
  }
}

export async function fetchBlogsFromSheet(): Promise<BlogPost[]> {
  try {
    const csv = await fetchSheetCsv(BLOG_SHEET_ID, process.env.GOOGLE_SHEETS_BLOG_GID);
    return rowsToObjects(parseCSV(csv)).map(mapBlog);
  } catch (error) {
    console.error("Google Sheets blog fetch failed, using fallback JSON:", error);
    return (blogsFallback as BlogPost[]).map((p) => ({
      ...p,
      image: p.image ?? null,
      imgAlt: p.imgAlt ?? p.title,
    }));
  }
}

export async function fetchCoursesFromSheet(): Promise<Course[]> {
  const universities = await fetchUniversitiesFromSheet();
  return deriveCourses(universities);
}

export { REVALIDATE_SECONDS };
