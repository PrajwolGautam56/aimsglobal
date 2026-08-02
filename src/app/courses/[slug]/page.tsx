import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpenCheck, BriefcaseBusiness, CheckCircle2, FileText, GraduationCap, Timer } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { UniversityCard } from "@/components/UniversityCard";
import { Button } from "@/components/ui/button";
import { createFaqSchema, getCourseGuide } from "@/lib/course-guides";
import { getCourseBySlug, getCourses } from "@/lib/courses";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getUniversities } from "@/lib/universities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const guide = getCourseGuide(course);
  const title = `${course.name} in India for Nepali Students`;
  const description = `${guide.overview.slice(0, 145).trim()} Learn eligibility, subjects, fees and admission steps.`;

  return {
    title,
    description,
    keywords: [`${course.name} in India for Nepali students`, `${course.name} admission India`, `${course.name} colleges India`, "education consultancy Butwal"],
    alternates: { canonical: `${SITE_URL}/courses/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/courses/${slug}`,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const guide = getCourseGuide(course);
  const allUniversities = await getUniversities();
  const universities = allUniversities.filter((university) => course.universities.includes(university.slug));
  const pageUrl = `${SITE_URL}/courses/${slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${course.name} in India for Nepali Students`,
    description: guide.overview,
    url: pageUrl,
    about: { "@type": "Thing", name: course.name },
    publisher: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <SchemaOrg data={webPageSchema} />
      <SchemaOrg data={createFaqSchema(guide.faqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }, { name: course.name }]} />

      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">Study in India from Nepal</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.name} in India for Nepali Students</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">{guide.overview}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button variant="accent" size="lg" asChild>
              <Link href={`/contact?course=${encodeURIComponent(course.name)}`}>Get {course.name} Counselling</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
              <a href="#universities">Explore University Options</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, label: "Study Level", value: guide.level },
            { icon: Timer, label: "Typical Duration", value: guide.duration },
            { icon: BookOpenCheck, label: "General Eligibility", value: guide.eligibility },
            { icon: BriefcaseBusiness, label: "Good Fit For", value: guide.bestFor },
          ].map((item) => (
            <div key={item.label} className="bg-white px-5 py-6">
              <item.icon className="h-5 w-5 text-accent" />
              <p className="mt-3 text-xs font-semibold uppercase text-text-muted">{item.label}</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Why Study {course.name}?</h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              A good course decision connects your interests, academic strengths, budget and long-term career plan. Use these points as a starting framework, then compare the curriculum of each institution.
            </p>
            <ul className="mt-6 space-y-4">
              {guide.whyStudy.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-text-primary">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text-primary">What You May Study</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Subject names and semester order vary. Always review the current official syllabus for the exact program.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {guide.subjects.map((subject) => (
                <div key={subject} className="border-b border-border pb-3 text-sm font-medium text-text-primary">{subject}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Career Directions</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              A degree does not guarantee a job or salary. Outcomes depend on skills, internships, communication, portfolio, location and market conditions.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {guide.careers.map((career) => (
                <li key={career} className="flex items-start gap-2 text-sm text-text-primary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {career}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">How to Choose a College</h2>
            <ol className="mt-6 space-y-4">
              {guide.selectionChecklist.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{index + 1}</span>
                  <span className="pt-1 text-text-primary">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <FileText className="h-8 w-8 text-primary-light" />
            <h2 className="mt-4 text-2xl font-bold text-text-primary">Documents to Prepare</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              Requirements change by course and institution. Keep clear scans and use the university&apos;s latest written checklist.
            </p>
            <ul className="mt-6 space-y-3">
              {guide.documents.map((document) => (
                <li key={document} className="flex gap-3 text-sm text-text-primary">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  {document}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text-primary">Plan the Full Cost</h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              Do not compare colleges using tuition alone. Ask for a written breakdown covering tuition, admission charges, examinations, laboratory or clinical fees, hostel, food, transport, deposits and scholarship renewal rules.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              AIMS Global can help organise the comparison, but the university&apos;s current offer letter and fee sheet should remain the final reference before payment.
            </p>
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="font-semibold text-text-primary">Related Guidance</h3>
              <div className="mt-3 flex flex-col gap-2">
                {guide.relatedBlogs.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-semibold text-primary-light hover:underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="universities" className="scroll-mt-24 bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-text-primary">Universities Offering {course.name}</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              Explore currently listed options, then request a personalised comparison based on your marks, preferred city, budget and accommodation needs.
            </p>
          </div>
          {universities.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {universities.map((university) => (
                <UniversityCard key={university.slug} university={university} />
              ))}
            </div>
          ) : (
            <div className="mt-8 border-l-4 border-accent bg-white p-6">
              <p className="text-text-muted">Contact AIMS Global for current {course.name} university options and intake availability.</p>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={guide.faqs} title={`${course.name} Admission FAQs`} />

      <section className="bg-bg-dark py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Need a {course.name} shortlist for your profile?</h2>
            <p className="mt-2 text-white/75">Talk with AIMS Global in Butwal about eligibility, fees, documents and current admission options.</p>
          </div>
          <Button variant="accent" size="lg" asChild>
            <Link href={`/contact?course=${encodeURIComponent(course.name)}`}>Book Free Counselling</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
