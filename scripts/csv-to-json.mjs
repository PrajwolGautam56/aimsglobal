import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data");
const logoManifestPath = path.join(dataDir, "university-logo-manifest.json");

function loadLogoManifest() {
  try {
    return JSON.parse(fs.readFileSync(logoManifestPath, "utf8"));
  } catch {
    return {};
  }
}

function getUniversityLogoPath(slug) {
  const manifest = loadLogoManifest();
  return manifest[slug] || `/logos/${slug}.png`;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field.trim());
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field.trim());
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      field = "";
      if (char === "\r") i++;
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows) {
  const [header, ...data] = rows;
  return data
    .filter((row) => row[0])
    .map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i] ?? "";
      });
      return obj;
    });
}

function resolveImageUrl(url) {
  const trimmed = (url || "").trim();
  if (!trimmed) return null;
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /[?&]id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }
  if (trimmed.startsWith("http")) return trimmed;
  return null;
}

function getImageAlt(alt, fallback) {
  return (alt || "").trim() || fallback;
}

function mapUniversity(raw) {
  const name = raw["University/College Name"];
  const courses = (raw["Popular Courses"] || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const slug = raw["Slug (URL)"];

  return {
    name,
    image: resolveImageUrl(raw.image || raw.Image) || getUniversityLogoPath(slug),
    imgAlt: getImageAlt(raw.img_alt || raw["img_alt"], `${name} logo`),
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
      "NEET scorecard (for medical courses)",
    ],
    placements: {
      averagePackage: raw["Highest Package (LPA)"] !== "—" ? `Up to ${raw["Highest Package (LPA)"]}` : "Contact for details",
      highestPackage: raw["Highest Package (LPA)"],
      recruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Accenture"],
    },
    coursesFees: courses.map((course) => ({
      course,
      duration: course.includes("MBBS") ? "5.5 years" : course.includes("MBA") || course.includes("M.Tech") ? "2 years" : "4 years",
      annualFee: raw["Annual Fees (INR)"],
      eligibility: "+2 with relevant subjects (minimum 50%)",
      entranceExam: course.includes("MBBS") ? "NEET" : course.includes("MBA") ? "CAT/MAT" : "Merit / University Entrance",
    })),
  };
}

function generateBlogContent(post) {
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

  return `# ${post.title}\n\n${post.metaDescription}\n\n${sections}\n\n## Frequently Asked Questions\n\n### Can Nepali students apply to Indian universities?\nYes. Nepali students can apply to most Indian universities with valid academic documents and, for medical courses, NEET qualification.\n\n### How can AIMS Global help?\nAIMS Global provides free counselling, document preparation, application support, and post-admission assistance from our Butwal office.\n\n### What documents are required?\nTypically +2 marksheets, passport, photographs, migration certificate, and course-specific documents.\n\n### How long does admission take?\nMost admissions are processed within 2–4 weeks after document submission.\n\n### Is counselling free?\nYes. Initial counselling at AIMS Global is completely free.\n\n---\n\nApply for admission through AIMS Global – your trusted consultancy in Butwal, Nepal.`;
}

function mapBlog(raw) {
  const outline = raw["H2 Headings (Outline)"] || "";
  const tags = (raw.Tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const title = raw["Blog Title"];
  const post = {
    title,
    image: resolveImageUrl(raw.image || raw.Image),
    imgAlt: getImageAlt(raw.img_alt || raw["img_alt"], title),
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
    publishedAt: "2025-06-01",
    readTime: Math.max(5, Math.round((Number(raw["Word Count (Target)"]) || 1200) / 200)),
    excerpt: raw["Meta Description (SEO)"],
    featured: (raw.Status || "").toLowerCase().includes("ready"),
  };

  post.content = generateBlogContent(post);
  return post;
}

function deriveCourses(universities) {
  const courseMap = new Map();

  const icons = {
    "B.Tech": "⚙️",
    MBBS: "🏥",
    MBA: "📊",
    BDS: "🦷",
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
          slug: base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          icon: icons[base] || "🎓",
          description: `Study ${base} at top Indian universities with guidance from AIMS Global, Butwal.`,
          universities: [],
        });
      }
      const entry = courseMap.get(base);
      if (!entry.universities.includes(uni.slug)) {
        entry.universities.push(uni.slug);
      }
    }
  }

  return Array.from(courseMap.values()).sort((a, b) => b.universities.length - a.universities.length);
}

const uniCsv = fs.readFileSync(path.join(dataDir, "universities_raw.csv"), "utf8");
const blogCsv = fs.readFileSync(path.join(dataDir, "blog_raw.csv"), "utf8");

const universities = rowsToObjects(parseCSV(uniCsv)).map(mapUniversity);
const blogs = rowsToObjects(parseCSV(blogCsv)).map(mapBlog);
const courses = deriveCourses(universities);

fs.writeFileSync(path.join(dataDir, "universities.json"), JSON.stringify(universities, null, 2));
fs.writeFileSync(path.join(dataDir, "blogs.json"), JSON.stringify(blogs, null, 2));
fs.writeFileSync(path.join(dataDir, "courses.json"), JSON.stringify(courses, null, 2));

console.log(`Created ${universities.length} universities, ${blogs.length} blogs, ${courses.length} courses`);
