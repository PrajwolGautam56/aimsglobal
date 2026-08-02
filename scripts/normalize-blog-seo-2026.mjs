import { readFile, writeFile } from "fs/promises";
import path from "path";

const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");

const seo = {
  "best-education-consultancy-butwal-india-admission": {
    focusKeyword: "best education consultancy in Butwal",
    metaTitle: "Best Education Consultancy in Butwal for India Admission",
    metaDescription: "Find the best education consultancy in Butwal for India admission by comparing transparency, course fit, fees, verification and student support.",
  },
  "study-in-india-from-nepal-guide": {
    focusKeyword: "study in India from Nepal",
    metaTitle: "Study in India from Nepal 2026: Admission, Courses & Fees",
    metaDescription: "Study in India from Nepal with a practical 2026 guide to courses, fees, documents, university checks, scholarships and safe admission steps.",
  },
  "top-engineering-colleges-bangalore-nepali-students": {
    focusKeyword: "engineering colleges in Bangalore for Nepali students",
    metaTitle: "Engineering Colleges in Bangalore for Nepali Students 2026",
    metaDescription: "Compare engineering colleges in Bangalore for Nepali students by branch, eligibility, laboratories, fees, placements and admission checks.",
  },
  "pharmacy-allied-health-india-nepali-students": {
    focusKeyword: "pharmacy and allied health in India for Nepali students",
    metaTitle: "Pharmacy and Allied Health in India for Nepali Students",
    metaDescription: "Explore pharmacy and allied health in India for Nepali students, including eligibility, recognition, practical training, fees and course options.",
  },
  "noc-india-study-nepal-documents": {
    focusKeyword: "Nepal NOC for study in India",
    metaTitle: "Nepal NOC for Study in India 2026: Documents & Process",
    metaDescription: "Prepare a Nepal NOC for study in India with official portal links, document checks, common application issues and safe payment planning.",
  },
  "bba-in-india-nepali-students-guide": {
    focusKeyword: "BBA in India for Nepali students",
    metaTitle: "BBA in India for Nepali Students 2026: Admission Guide",
    metaDescription: "Plan BBA in India for Nepali students with guidance on eligibility, specialisations, college selection, total fees, careers and documents.",
  },
  "mba-in-india-nepali-students-guide": {
    focusKeyword: "MBA in India for Nepali students",
    metaTitle: "MBA in India for Nepali Students 2026: Fees & Admission",
    metaDescription: "Compare MBA in India for Nepali students by eligibility, entrance route, specialisation, internships, total fees and institute quality.",
  },
  "btech-in-india-nepali-students-guide": {
    focusKeyword: "B.Tech in India for Nepali students",
    metaTitle: "B.Tech in India for Nepali Students 2026: Complete Guide",
    metaDescription: "Plan B.Tech in India for Nepali students by comparing branches, eligibility, recognition, laboratories, fees, scholarships and admission.",
  },
  "india-scholarships-nepali-students-guide": {
    focusKeyword: "scholarships in India for Nepali students",
    metaTitle: "Scholarships in India for Nepali Students 2026",
    metaDescription: "Compare scholarships in India for Nepali students by award amount, tuition coverage, exclusions, renewal rules and full study cost.",
  },
  "management-courses-india-nepali-students": {
    focusKeyword: "management courses in India for Nepali students",
    metaTitle: "Management Courses in India for Nepali Students 2026",
    metaDescription: "Compare management courses in India for Nepali students, including BBA, BBS and MBA entry levels, curriculum, fees and career paths.",
  },
  "nursing-india-nepali-students-gnm-bsc": {
    focusKeyword: "nursing in India for Nepali students",
    metaTitle: "Nursing in India for Nepali Students: GNM & B.Sc 2026",
    metaDescription: "Compare nursing in India for Nepali students through GNM and B.Sc Nursing eligibility, recognition, clinical training, fees and admission.",
  },
  "study-in-bangalore-guide-nepali-students": {
    focusKeyword: "study in Bangalore from Nepal",
    metaTitle: "Study in Bangalore from Nepal 2026: Complete Student Guide",
    metaDescription: "Study in Bangalore from Nepal with a guide to courses, campus location, accommodation, living costs, student life and admission planning.",
  },
  "safe-india-admission-without-fraud-nepali-students": {
    focusKeyword: "safe India admission from Nepal",
    metaTitle: "Safe India Admission from Nepal: Avoid Fraud & Hidden Fees",
    metaDescription: "Plan safe India admission from Nepal by checking recognition, offer letters, full fees, payments, scholarships, refunds and consultancy claims.",
  },
  "alliance-university-bangalore-admission-nepali-students": {
    focusKeyword: "Alliance University admission for Nepali students",
    metaTitle: "Alliance University Admission for Nepali Students 2026",
    metaDescription: "Plan Alliance University admission for Nepali students by comparing courses, eligibility, current fees, scholarship terms, campus and hostel.",
  },
  "top-universities-south-india-nepali-students": {
    focusKeyword: "universities in South India for Nepali students",
    metaTitle: "Universities in South India for Nepali Students 2026",
    metaDescription: "Compare universities in South India for Nepali students by course, recognition, city, fees, hostel, practical exposure and student fit.",
  },
  "bms-college-engineering-vs-cmrit-bangalore": {
    focusKeyword: "BMSCE vs CMRIT Bangalore",
    metaTitle: "BMSCE vs CMRIT Bangalore for Nepali Students 2026",
    metaDescription: "Compare BMSCE vs CMRIT Bangalore by engineering branch, affiliation, fee basis, laboratories, placements, location and hostel options.",
  },
  "parul-university-admission-nepali-students-2025": {
    focusKeyword: "Parul University admission for Nepali students",
    metaTitle: "Parul University Admission for Nepali Students 2026",
    metaDescription: "Plan Parul University admission for Nepali students by comparing courses, SAARC fees, scholarships, hostel, eligibility and official terms.",
  },
  "srm-university-vs-amrita-university-nepali-students": {
    focusKeyword: "SRM vs Amrita University for Nepali students",
    metaTitle: "SRM vs Amrita University for Nepali Students 2026",
    metaDescription: "Compare SRM vs Amrita University for Nepali students by campus, course, recognition, fees, scholarships and practical learning.",
  },
};

const posts = JSON.parse(await readFile(blogsFile, "utf8"));
for (const post of posts) {
  const update = seo[post.slug];
  if (update) Object.assign(post, update);
}

await writeFile(blogsFile, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Normalised SEO metadata for ${Object.keys(seo).length} articles.`);
