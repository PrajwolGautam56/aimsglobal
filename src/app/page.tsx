import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Building2, CheckCircle2, FileCheck2, MapPin, ShieldCheck, WalletCards } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { CourseCard } from "@/components/CourseCard";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { UniversityCard } from "@/components/UniversityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPublishedBlogPosts } from "@/lib/blogs";
import { createFaqSchema } from "@/lib/course-guides";
import { POPULAR_COURSES } from "@/lib/courses";
import { ADDRESS, EMAIL, PHONE, SITE_URL, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/constants";
import { getFeaturedUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "Study in India from Nepal | Education Consultancy Butwal",
  description: "AIMS Global Butwal provides India admission guidance for BBA, BBS, MBA, B.Tech, pharmacy, allied health, paramedical and nursing courses.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "AIMS Global - Study in India from Nepal",
    description: "Compare courses, university options, fees, scholarships and documents with India admission counselling from Butwal.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/brand/homepage-hero-education-consultancy-butwal.webp`, alt: "AIMS Global India admission counselling in Butwal" }],
  },
};

const steps = [
  { title: "Profile & Goal Review", desc: "Share your marks, subject background, preferred course, city and realistic family budget." },
  { title: "Course & College Comparison", desc: "Compare suitable options by curriculum, recognition, practical exposure, fees and accommodation." },
  { title: "Documents & Application", desc: "Prepare consistent academic records and submit applications through the current institution process." },
  { title: "Offer, Payment & Departure", desc: "Review the written offer, fee inclusions and next steps before confirming admission or making payment." },
];

const trustPoints = [
  "Free Initial Counselling",
  "Course-First University Shortlisting",
  "Written Fee & Scholarship Comparison",
  "Application and Document Support",
  "NOC Preparation Guidance",
  "Hostel and Post-Admission Coordination",
];

const decisionGuides = [
  { href: "/courses/bba", label: "Why study BBA?", text: "Build foundations in management, marketing, finance, communication and entrepreneurship after Grade 12." },
  { href: "/courses/mba", label: "Why study MBA?", text: "Develop advanced business judgement and specialise after completing a recognised bachelor's degree." },
  { href: "/courses/b-tech", label: "Why study B.Tech?", text: "Combine engineering fundamentals with laboratories, projects, internships and branch-specific technical skills." },
  { href: "/courses/b-pharm", label: "Why study B.Pharm?", text: "Study medicines, formulation, quality systems and pharmaceutical practice through a recognised program." },
  { href: "/courses/bsc-nursing", label: "Why study B.Sc Nursing?", text: "Prepare for degree-level nursing through science, skills labs and supervised clinical learning." },
  { href: "/courses/allied-health", label: "Why allied health?", text: "Explore diagnostic, laboratory, imaging, rehabilitation and other practical healthcare careers in allied health." },
];

const homeFaqs: FaqItem[] = [
  { question: "Which is the best education consultancy in Butwal for studying in India?", answer: "The best choice should explain recognition, course fit, total fees, scholarship conditions, documents and payment steps clearly. AIMS Global offers India-focused counselling from Finance Chowk, Butwal, and encourages families to verify written university information before deciding." },
  { question: "Can students from anywhere in Nepal use AIMS Global?", answer: "Yes. Students and parents from Butwal, Bhairahawa, Nepalgunj, Dang, Pokhara, Kathmandu and other parts of Nepal can begin by phone, WhatsApp or online enquiry." },
  { question: "Which India courses does AIMS Global prioritise?", answer: "Priority areas include BBA, BBS, MBA, engineering, computer applications, pharmacy, allied health, paramedical, GNM Nursing and B.Sc Nursing, plus selected professional courses." },
  { question: "Which healthcare courses does AIMS Global focus on?", answer: "AIMS Global currently focuses on pharmacy, nursing, allied health and paramedical programs for healthcare-related India admission guidance." },
  { question: "Are university fees shown on the website final?", answer: "No. Fee information is a planning guide. The current university fee sheet and written offer should be checked because tuition, hostel, scholarship and extra charges can change by intake." },
  { question: "What documents are commonly needed to study in India from Nepal?", answer: "Students commonly prepare academic marksheets and certificates, citizenship or passport details, photographs, migration or transfer documents, and course-specific records. The exact checklist depends on the institution and course." },
  { question: "Can AIMS Global help with Nepal NOC preparation?", answer: "AIMS Global can help students organise admission and academic documents for the NOC process. Students should always follow the current official Ministry of Education NOC portal and requirements." },
];

export default async function HomePage() {
  const [featuredUniversities, blogPosts] = await Promise.all([
    getFeaturedUniversities(8),
    getPublishedBlogPosts(),
  ]);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <SchemaOrg data={createFaqSchema(homeFaqs)} />
      <HeroSection />

      <section className="border-b border-border bg-bg-light py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form action="/universities" method="get" className="mx-auto max-w-4xl space-y-4">
            <Input name="search" placeholder="Search university, course or city..." className="h-14 text-base" />
            <div className="grid gap-3 sm:grid-cols-3">
              <select name="state" className="h-11 rounded-lg border border-border bg-white px-3 text-sm">
                <option value="">All States</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi NCR</option>
              </select>
              <select name="courseType" className="h-11 rounded-lg border border-border bg-white px-3 text-sm">
                <option value="">All Course Types</option>
                <option value="Management">Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Health & Allied">Health & Allied</option>
              </select>
              <Button type="submit" variant="accent" className="h-11">Find Options</Button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="font-accent text-sm font-semibold uppercase text-primary-light">India Education Consultancy in Butwal</p>
            <h2 className="mt-3 text-3xl font-bold text-text-primary">One Place to Plan Your India Admission Clearly</h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              AIMS Global helps Nepali students move from a broad idea such as “I want to study in India” to a practical course and college shortlist. We compare what matters: eligibility, syllabus, recognition, laboratories or clinical exposure, city, hostel, fee basis, scholarship conditions and the official admission process.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              Our current priority is management, engineering, computer applications, pharmacy, allied health, paramedical and nursing education, with detailed guidance for the programs we actively support.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              Students can visit us at {ADDRESS} or begin remotely from anywhere in Nepal. The final decision stays with the student and family, supported by written university information rather than pressure or vague promises.
            </p>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6 sm:p-8">
            <h3 className="text-xl font-bold text-text-primary">What We Help You Compare</h3>
            <ul className="mt-6 space-y-4">
              {["Course eligibility and specialisation", "University status and applicable approvals", "Tuition, hostel, food and extra charges", "Scholarship amount and renewal rules", "Practical training, internships and placements", "Documents, offer letter and payment steps"].map((item) => (
                <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-text-primary">Explore University Options in India</h2>
              <p className="mt-2 text-text-muted">Compare institutions across Karnataka, Tamil Nadu, Gujarat, Delhi NCR and other education hubs.</p>
            </div>
            <Link href="/universities" className="hidden items-center gap-1 text-sm font-semibold text-primary-light sm:flex">View Options <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredUniversities.map((university) => <UniversityCard key={university.slug} university={university} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-text-primary">Popular Courses for Nepali Students</h2>
            <p className="mt-3 leading-relaxed text-text-muted">Start with the course that matches your academic background and career direction, then compare suitable universities and total costs.</p>
          </div>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {POPULAR_COURSES.map((course) => <CourseCard key={course.slug} {...course} />)}
          </div>
        </div>
      </section>

      <section className="bg-bg-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Why Study These Courses in India?</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-white/75">Use each guide to understand the purpose of the course before looking at college names or promotional packages.</p>
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {decisionGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="border-t border-white/20 pt-5 transition-colors hover:border-accent">
                <h3 className="text-lg font-bold text-accent">{guide.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{guide.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">Read course guide <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-text-primary">How India Admission Works with AIMS Global</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center leading-relaxed text-text-muted">A clear sequence reduces rushed decisions and helps families verify cost and documents before admission confirmation.</p>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-white p-6">
                <p className="font-accent text-sm font-bold text-accent">Step {index + 1}</p>
                <h3 className="mt-3 font-bold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-accent text-sm font-semibold uppercase text-primary-light">Best Consultancy in Butwal?</p>
            <h2 className="mt-3 text-3xl font-bold text-text-primary">Judge the Process, Not Only the Claim</h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              Students searching for the best education consultancy in Butwal should expect direct answers: Why this course? Is the institution recognised? What does the quoted fee include? What can change? Which account receives payment? What happens if admission terms change?
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              AIMS Global is building its India admission service around transparent comparison, documented information and support before and after admission. We encourage parents to ask questions, read the offer letter and keep every official receipt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point, index) => {
              const icons = [BookOpenCheck, Building2, WalletCards, FileCheck2, ShieldCheck, MapPin];
              const Icon = icons[index];
              return <div key={point} className="border border-border bg-white p-5"><Icon className="h-6 w-6 text-accent" /><p className="mt-3 font-semibold text-text-primary">{point}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Prepare Your Admission Documents</h2>
            <p className="mt-4 leading-relaxed text-text-muted">The exact checklist varies, but starting early helps prevent spelling mismatches, unclear scans and delayed applications.</p>
            <ul className="mt-6 space-y-3">
              {["Academic marksheets and pass certificates", "Citizenship or passport details", "Recent photographs", "Migration, transfer or character certificate", "Course-specific entrance or eligibility records", "Offer letter, fee sheet and payment receipts", "Documents required by Nepal's current NOC process"].map((item) => (
                <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-primary bg-bg-light p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text-primary">Plan Beyond Tuition</h2>
            <p className="mt-4 leading-relaxed text-text-muted">A realistic India study budget can include admission charges, examinations, laboratories or clinical postings, hostel, food, local transport, travel from Nepal, books, uniforms, refundable deposits and an emergency reserve.</p>
            <p className="mt-4 leading-relaxed text-text-muted">Scholarships may reduce tuition, but families should confirm the amount, duration, academic renewal conditions and exclusions in writing.</p>
            <Link href="/blog/india-scholarships-nepali-students-guide" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary-light hover:underline">Read scholarship planning guide <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div><h2 className="text-3xl font-bold text-text-primary">India Admission Guides</h2><p className="mt-2 text-text-muted">Practical articles on courses, fees, documents, scholarships and college selection.</p></div>
            <Link href="/blog" className="text-sm font-semibold text-primary-light">View All</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      <FaqSection items={homeFaqs} title="Study in India and AIMS Global FAQs" intro="Answers for students and parents comparing India admission support from Nepal." />

      <section className="bg-bg-dark py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Start with a clear course and budget discussion</h2>
          <p className="mt-3 text-white/80">Call {PHONE} · {EMAIL}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="accent" size="lg" asChild><Link href="/contact">Book Free Counselling</Link></Button>
            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild><a href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp AIMS Global</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
