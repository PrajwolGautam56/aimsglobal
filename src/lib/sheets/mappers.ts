import type { BlogPost } from "@/lib/blogs";
import type { Course } from "@/lib/courses";
import { getSheetImageFields } from "@/lib/images";
import { getUniversityLogoPath } from "@/lib/university-logos";
import type { University } from "@/lib/university-shared";

export function mapUniversity(raw: Record<string, string>): University {
  const name = raw["University/College Name"];
  const { image, imgAlt } = getSheetImageFields(raw, `${name} logo`);
  const slug = raw["Slug (URL)"];

  const courses = (raw["Popular Courses"] || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  return {
    name,
    image: image ?? getUniversityLogoPath(slug),
    imgAlt,
    city: raw.City,
    state: raw["State/Country"],
    type: raw.Type,
    naacGrade: raw["NAAC Grade"] || "—",
    nirfRanking: raw["NIRF Ranking"] || "—",
    popularCourses: courses,
    annualFees: raw["Annual Fees (INR)"],
    highestPackage: raw["Highest Package (LPA)"],
    keyHighlights: raw["Key Highlights"],
    officialWebsite: raw["Official Website"],
    slug,
    metaTitle: raw["Meta Title (SEO)"],
    metaDescription: raw["Meta Description (SEO)"],
    isFeatured: (raw["Is Featured?"] || "").toLowerCase() === "yes",
    status: raw.Status || "Active",
    established: "—",
    topCourse: courses[0] || "—",
    overview: `${raw["University/College Name"]} is located in ${raw.City}, ${raw["State/Country"]}. ${raw["Key Highlights"]}`,
    admissionSteps: [
      "Share your academic documents with AIMS Global counsellors",
      "Get a personalised shortlist based on your budget and course preference",
      "Submit application forms with our document support",
      "Receive admission letter and complete fee payment",
      "Get visa and travel guidance before departure",
    ],
    documentsRequired: [
      "+2 / SEE marksheets and certificates",
      "Passport copy",
      "Passport-size photographs",
      "Migration certificate",
      "Character certificate",
      "Course-specific entrance or eligibility documents, if required",
    ],
    placements: {
      averagePackage:
        raw["Highest Package (LPA)"] !== "—"
          ? `Up to ${raw["Highest Package (LPA)"]}`
          : "Contact for details",
      highestPackage: raw["Highest Package (LPA)"],
      recruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Accenture"],
    },
    coursesFees: courses.map((course) => ({
      course,
      duration: course.includes("MBA") || course.includes("M.Tech")
          ? "2 years"
          : "4 years",
      annualFee: raw["Annual Fees (INR)"],
      eligibility: "+2 with relevant subjects (minimum 50%)",
      entranceExam: course.includes("MBA")
          ? "CAT/MAT"
          : "Merit / University Entrance",
    })),
  };
}

function generateBlogContent(post: Omit<BlogPost, "content">): string {
  const headings = (post.outline || "")
    .split("|")
    .map((h) => h.trim())
    .filter(Boolean);

  const sections = headings
    .map(
      (heading) =>
        `## ${heading}\n\nPlanning your education journey from Nepal to India requires careful research. ${post.focusKeyword} is a common search among Nepali students and parents. AIMS Global in Butwal helps you navigate admissions, documents, and university selection with transparent guidance.\n\n> **Need guidance?** Contact AIMS Global in Butwal – Call 974-3679606 or [WhatsApp us](/contact).`
    )
    .join("\n\n");

  return `# ${post.title}\n\n${post.metaDescription}\n\n${sections}\n\n## Frequently Asked Questions\n\n### Can Nepali students apply to Indian universities?\nYes. Nepali students can apply when they meet the selected course and university requirements.\n\n### How can AIMS Global help?\nAIMS Global provides free counselling, document preparation, application support, and post-admission assistance from our Butwal office.\n\n### What documents are required?\nTypically academic certificates, identity documents, photographs, migration documents, and course-specific records.\n\n### Is counselling free?\nYes. Initial counselling at AIMS Global is completely free.\n\n---\n\nApply for admission through AIMS Global – your trusted consultancy in Butwal, Nepal.`;
}

export function mapBlog(raw: Record<string, string>): BlogPost {
  const outline = raw["H2 Headings (Outline)"] || "";
  const tags = (raw.Tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const title = raw["Blog Title"];
  const { image, imgAlt } = getSheetImageFields(raw, title);

  const post: Omit<BlogPost, "content"> = {
    title,
    image,
    imgAlt,
    slug: raw["Slug (URL)"],
    metaTitle: raw["Meta Title (SEO)"],
    metaDescription: raw["Meta Description (SEO)"],
    focusKeyword: raw["Focus Keyword"],
    secondaryKeywords: raw["Secondary Keywords"],
    category: raw.Category,
    tags,
    targetAudience: raw["Target Audience"],
    wordCount: Number(raw["Word Count (Target)"]) || 1200,
    outline,
    internalLinks: raw["Internal Links"],
    status: raw.Status || "Draft",
    priority: raw.Priority || "Medium",
    notes: raw.Notes || "",
    author: "AIMS Global Team",
    publishedAt: new Date().toISOString().slice(0, 10),
    readTime: Math.max(5, Math.round((Number(raw["Word Count (Target)"]) || 1200) / 200)),
    excerpt: raw["Meta Description (SEO)"],
    featured: (raw.Status || "").toLowerCase().includes("ready"),
  };

  return { ...post, content: generateBlogContent(post) };
}

export function deriveCourses(universities: University[]): Course[] {
  const courseMap = new Map<string, Course>();

  const icons: Record<string, string> = {
    "B.Tech": "⚙️",
    MBA: "📊",
    BBA: "💼",
    Law: "⚖️",
    Design: "🎨",
    Pharmacy: "💊",
    "B.Pharm": "💊",
    BCA: "💻",
    "M.Tech": "🔧",
  };

  for (const uni of universities) {
    for (const course of uni.popularCourses) {
      const base = course.split("(")[0].trim();
      if (!courseMap.has(base)) {
        courseMap.set(base, {
          name: base,
          slug: base
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
          icon: icons[base] || "🎓",
          description: `Study ${base} at top Indian universities with guidance from AIMS Global, Butwal.`,
          universities: [],
        });
      }
      const entry = courseMap.get(base)!;
      if (!entry.universities.includes(uni.slug)) {
        entry.universities.push(uni.slug);
      }
    }
  }

  return Array.from(courseMap.values()).sort((a, b) => b.universities.length - a.universities.length);
}
