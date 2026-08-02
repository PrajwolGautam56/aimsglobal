import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { UniversitiesPageClient } from "@/components/UniversitiesPageClient";
import { Button } from "@/components/ui/button";
import { createFaqSchema } from "@/lib/course-guides";
import { SITE_URL } from "@/lib/constants";
import { getUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "Universities in India for Nepali Students",
  description:
    "Browse universities and colleges in India. Filter by state, course type and budget. Apply through AIMS Global, Butwal.",
  alternates: { canonical: `${SITE_URL}/universities` },
  openGraph: {
    title: "Universities in India for Nepali Students",
    description: "Compare Indian universities and colleges by location, course, fees and admission information with AIMS Global Butwal.",
    url: `${SITE_URL}/universities`,
  },
};

const universityFaqs: FaqItem[] = [
  { question: "How should Nepali students compare universities in India?", answer: "Compare the exact course curriculum, university or affiliation, applicable approval, practical training, department-level outcomes, location, accommodation and full cost." },
  { question: "Are the listed fees guaranteed?", answer: "No. Fees are planning information and may use different bases such as yearly tuition, total tuition or a hostel package. Confirm the current written fee sheet and offer before payment." },
  { question: "Can AIMS Global help me shortlist options?", answer: "Yes. AIMS Global can shortlist supported institutions using academic eligibility, preferred course, city, budget and accommodation needs." },
  { question: "Should I verify university recognition myself?", answer: "Yes. Students and parents should check current official sources such as the relevant university, UGC and applicable professional councils." },
];

interface PageProps {
  searchParams: Promise<{
    search?: string;
    state?: string;
    courseType?: string;
  }>;
}

export default async function UniversitiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const universities = await getUniversities();

  return (
    <>
      <SchemaOrg data={createFaqSchema(universityFaqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Universities" }]} />
      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">Compare Before You Apply</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Universities & Colleges in India</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
            Explore institutions across Karnataka, Tamil Nadu, Gujarat, Delhi NCR and other education hubs. Filter the current directory, then request a personalised course, fee and eligibility comparison.
          </p>
        </div>
      </section>
      <UniversitiesPageClient
        universities={universities}
        initialSearch={params.search || ""}
        initialState={params.state || "All"}
        initialCourseType={params.courseType || "All"}
      />

      <section className="border-t border-border bg-bg-light py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Choosing an Indian University from Nepal</h2>
            <p className="mt-4 leading-relaxed text-text-muted">A university name alone does not tell you whether the exact course, campus and fee package fit your plans. Begin with the degree curriculum and eligibility, then verify the institution and compare practical learning, location and total cost.</p>
            <p className="mt-4 leading-relaxed text-text-muted">AIMS Global adds new options as updated information becomes available. The directory is a research starting point, while the university&apos;s current official offer remains the final reference for admission and payment.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Comparison Checklist</h2>
            <ul className="mt-6 space-y-4">
              {["Exact course, branch and awarded degree", "University status, affiliation and applicable approval", "Laboratories, clinical exposure or internship model", "Department-level placement information", "Tuition, hostel, food, exams and deposits", "Scholarship amount, duration and renewal conditions", "Official payment instructions and refund policy"].map((item) => <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection items={universityFaqs} title="University Selection FAQs" />

      <section className="bg-bg-dark py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div><h2 className="text-2xl font-bold">Need options matched to your course and budget?</h2><p className="mt-2 text-white/75">Share your academic background and preferences with AIMS Global in Butwal.</p></div>
          <Button variant="accent" size="lg" asChild><Link href="/contact">Get a Personalised Shortlist</Link></Button>
        </div>
      </section>
    </>
  );
}
