import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, BriefcaseBusiness, CheckCircle2, FlaskConical, HeartPulse, Settings } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseCard } from "@/components/CourseCard";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { Button } from "@/components/ui/button";
import { createFaqSchema } from "@/lib/course-guides";
import { getCourses, POPULAR_COURSES } from "@/lib/courses";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Courses in India for Nepali Students",
  description: "Compare BBA, BBS, MBA, B.Tech, pharmacy, allied health, paramedical, GNM and B.Sc Nursing courses in India with AIMS Global Butwal.",
  alternates: { canonical: `${SITE_URL}/courses` },
  openGraph: {
    title: "Courses in India for Nepali Students",
    description: "Choose a course by eligibility, curriculum, career direction and total cost with India admission guidance from Butwal.",
    url: `${SITE_URL}/courses`,
  },
};

const pathways = [
  { icon: BriefcaseBusiness, title: "Management & Commerce", text: "BBA, BBS, B.Com and MBA pathways for business, finance, marketing, HR, operations and entrepreneurship.", links: [{ label: "BBA", href: "/courses/bba" }, { label: "BBS", href: "/courses/bbs" }, { label: "MBA", href: "/courses/mba" }] },
  { icon: Settings, title: "Engineering & Technology", text: "B.Tech and related branches across computer science, AI, electronics, civil, mechanical and other engineering fields.", links: [{ label: "B.Tech", href: "/courses/b-tech" }, { label: "BCA", href: "/courses/bca" }, { label: "MCA", href: "/courses/mca" }] },
  { icon: FlaskConical, title: "Pharmacy", text: "B.Pharm, D.Pharm and Pharm.D options with attention to laboratories, practical training and applicable recognition.", links: [{ label: "B.Pharm", href: "/courses/b-pharm" }, { label: "D.Pharm", href: "/courses/d-pharm" }, { label: "Pharm.D", href: "/courses/pharm-d" }] },
  { icon: HeartPulse, title: "Nursing & Allied Health", text: "GNM, B.Sc Nursing, physiotherapy, laboratory, imaging, operation theatre and other paramedical pathways.", links: [{ label: "GNM Nursing", href: "/courses/gnm-nursing" }, { label: "B.Sc Nursing", href: "/courses/bsc-nursing" }, { label: "Allied Health", href: "/courses/allied-health" }] },
];

const courseFaqs: FaqItem[] = [
  { question: "Which courses does AIMS Global support for India admission?", answer: "Priority areas include BBA, BBS, MBA, engineering, computer applications, pharmacy, allied health, paramedical, GNM Nursing and B.Sc Nursing, along with selected law, design and other professional programs." },
  { question: "Which healthcare courses can I compare with AIMS Global?", answer: "AIMS Global helps students compare pharmacy, nursing, allied health and paramedical options in India, including course fit, documents and fee planning." },
  { question: "How should I choose between course and college?", answer: "Choose the course direction first, then compare colleges by curriculum, recognition, practical exposure, location, total cost and outcomes for that specific department." },
  { question: "Can fees or scholarships change?", answer: "Yes. Fees and scholarship rules can change by intake, campus, marks, room type and university policy. Confirm the current written offer before paying." },
  { question: "Can I get counselling from outside Butwal?", answer: "Yes. Students and parents across Nepal can begin by phone, WhatsApp or the online enquiry form, while the AIMS Global office is located at Finance Chowk in Butwal." },
];

export default async function CoursesPage() {
  const allCourses = await getCourses();

  return (
    <>
      <SchemaOrg data={createFaqSchema(courseFaqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses" }]} />

      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">Course Guidance from Butwal</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Courses in India for Nepali Students</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
            Compare course content, eligibility, duration, career direction and total study cost before choosing an Indian university. AIMS Global helps students build a practical shortlist around their profile and goals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-text-primary">Start with the Right Study Path</h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              A popular course is not automatically the right course. Consider your Grade 12 subjects, strongest skills, preferred work style, budget and plans for professional registration or postgraduate study. Then compare the exact syllabus at each institution.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
            {pathways.map((pathway) => (
              <div key={pathway.title} className="border-t-4 border-primary pt-6">
                <pathway.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-xl font-bold text-text-primary">{pathway.title}</h3>
                <p className="mt-3 leading-relaxed text-text-muted">{pathway.text}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {pathway.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-semibold text-primary-light hover:underline">{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-text-primary">Priority Courses</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_COURSES.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <BookOpenCheck className="h-9 w-9 text-primary-light" />
            <h2 className="mt-4 text-2xl font-bold text-text-primary">Before You Select a Course</h2>
            <ul className="mt-6 space-y-4">
              {["Read the semester-wise syllabus and practical requirements", "Check whether your Grade 12 subjects meet eligibility", "Understand professional recognition or registration needs", "Compare internships, laboratories and clinical exposure", "Plan tuition, hostel, food, travel and extra charges together", "Keep a second course or budget option available"].map((item) => (
                <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text-primary">Healthcare Course Scope</h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              AIMS Global supports pharmacy, allied health, paramedical, GNM Nursing and B.Sc Nursing pathways with focused guidance on programs, documents and fee structures.
            </p>
            <Button variant="accent" className="mt-6" asChild><Link href="/contact">Discuss Your Course</Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-text-primary">Explore All Course Guides</h2>
            <p className="mt-3 leading-relaxed text-text-muted">Open any course to review eligibility, subjects, career directions, selection checks and available university options.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCourses.map((course) => (
              <Link key={course.slug} href={`/courses/${course.slug}`} className="border border-border bg-white p-5 transition-shadow hover:shadow-md">
                <span className="text-2xl" aria-hidden="true">{course.icon}</span>
                <h3 className="mt-2 font-bold text-text-primary">{course.name}</h3>
                <p className="mt-1 text-sm text-text-muted">Eligibility, curriculum, careers and fee planning</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={courseFaqs} title="Course and India Admission FAQs" />
    </>
  );
}
