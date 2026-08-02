import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, CheckCircle2, FileCheck2, GraduationCap, HeartHandshake, MapPin, Scale, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { Button } from "@/components/ui/button";
import { createFaqSchema } from "@/lib/course-guides";
import { ADDRESS, EMAIL, PHONE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "About AIMS Global | Education Consultancy Butwal" },
  description: "Meet AIMS Global, an India-focused education consultancy at Finance Chowk, Butwal helping Nepali students compare courses, fees and admissions.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About AIMS Global Education Consultancy Butwal",
    description: "Student-first guidance for management, engineering, pharmacy, allied health, paramedical and nursing admissions in India.",
    url: `${SITE_URL}/about`,
  },
};

const values = [
  { icon: ShieldCheck, title: "Transparency", desc: "Explain what a fee includes, what may change and which written document should be treated as final." },
  { icon: GraduationCap, title: "Course Fit", desc: "Begin with eligibility, interests and career direction before recommending a university name." },
  { icon: Scale, title: "Informed Choice", desc: "Compare recognition, curriculum, practical exposure, location and cost without forcing a decision." },
  { icon: HeartHandshake, title: "Student Support", desc: "Help families organise applications, documents and next steps before and after admission." },
];

const aboutFaqs: FaqItem[] = [
  { question: "What does AIMS Global do?", answer: "AIMS Global helps Nepali students compare supported courses and Indian institutions, prepare applications and documents, understand fees and scholarships, and coordinate admission steps." },
  { question: "Where is AIMS Global located?", answer: `The office is at ${ADDRESS}. Students outside Butwal can begin by phone, WhatsApp or online enquiry.` },
  { question: "Which courses are AIMS Global's priority?", answer: "Priority areas include BBA, BBS, MBA, B.Tech and other engineering programs, computer applications, pharmacy, allied health, paramedical, GNM Nursing and B.Sc Nursing." },
  { question: "Which healthcare study areas does AIMS Global guide?", answer: "AIMS Global guides students toward pharmacy, nursing, allied health and paramedical study options in India." },
  { question: "How does AIMS Global choose a university for a student?", answer: "The shortlist considers academic eligibility, course curriculum, recognition, practical learning, preferred city, accommodation, full cost and current admission availability." },
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrg data={createFaqSchema(aboutFaqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About AIMS Global" }]} />

      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">India Admission Guidance from Butwal</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">About AIMS Global</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
            A student-first education consultancy helping Nepali students turn India study options into a clear, verified and affordable admission plan.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Why AIMS Global Exists</h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              Choosing a course and college in another country can become confusing quickly. University advertisements may use different fee bases, scholarship names and placement figures, while students are also trying to understand eligibility, documents, hostels and future career value.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              AIMS Global was built to make that decision easier for Nepali students and parents. From our Finance Chowk office in Butwal, we organise course information, compare supported Indian institutions and help families move through the application process with clearer questions and better documentation.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              Our role is not to promise that one university is perfect for everyone. It is to help each student understand the trade-offs between course content, recognition, location, practical exposure, fee structure and long-term plans, then make an informed choice.
            </p>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6 sm:p-8">
            <MapPin className="h-8 w-8 text-primary-light" />
            <h2 className="mt-4 text-2xl font-bold text-text-primary">Based in Butwal, Available Across Nepal</h2>
            <p className="mt-4 leading-relaxed text-text-muted">Students from Butwal and nearby cities can meet our team in person. Families from other districts can start with a phone, WhatsApp or online counselling discussion.</p>
            <p className="mt-5 font-semibold text-text-primary">{ADDRESS}</p>
            <p className="mt-2 text-sm text-text-muted">Phone: {PHONE}<br />Email: {EMAIL}</p>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-text-primary">How We Work</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center leading-relaxed text-text-muted">Our standard is simple: useful information, clear limits and written confirmation before important decisions.</p>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="border-t-4 border-primary pt-6">
                <value.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-bold text-text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-accent text-sm font-semibold uppercase text-primary-light">What We Support</p>
            <h2 className="mt-3 text-3xl font-bold text-text-primary">India Admission Services for Nepali Students</h2>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpenCheck, title: "Course Counselling", text: "Compare BBA, BBS, MBA, engineering, computer applications, pharmacy, allied health, paramedical, GNM and B.Sc Nursing pathways." },
              { icon: GraduationCap, title: "University Shortlisting", text: "Match the student's profile with suitable institutions, locations, course structures and realistic budget options." },
              { icon: FileCheck2, title: "Application Support", text: "Organise academic records, identity details, forms and institution-specific documents for consistent submission." },
              { icon: Scale, title: "Fee & Scholarship Review", text: "Separate tuition from hostel and extra charges, and check scholarship amount, duration, conditions and exclusions." },
              { icon: ShieldCheck, title: "Offer Verification", text: "Read the written admission offer, payment instructions and refund terms before seat confirmation." },
              { icon: HeartHandshake, title: "After-Admission Coordination", text: "Support communication around hostel, reporting, document handover and practical next steps where available." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6">
                <service.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 font-bold text-text-primary">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-dark py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Our Course Focus</h2>
            <p className="mt-4 leading-relaxed text-white/75">AIMS Global currently prioritises the study areas where we can build detailed course, fee and institution comparisons for students.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["BBA", "BBS", "MBA", "B.Tech", "BCA", "MCA", "B.Pharm", "D.Pharm", "Allied Health", "Paramedical", "GNM Nursing", "B.Sc Nursing"].map((course) => <span key={course} className="border border-white/20 px-3 py-2 text-sm text-white/85">{course}</span>)}
            </div>
          </div>
          <div className="border-l-4 border-accent pl-6">
            <h2 className="text-2xl font-bold">Healthcare Course Focus</h2>
            <p className="mt-4 leading-relaxed text-white/75">Students seeking healthcare-related options through AIMS Global can explore pharmacy, nursing, allied health and paramedical courses with clear course, fee and institution comparisons.</p>
            <Link href="/courses" className="mt-6 inline-flex items-center font-semibold text-accent hover:underline">Explore supported courses</Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">What Families Should Verify</h2>
            <ul className="mt-6 space-y-4">
              {["The university or affiliation on an official source", "Applicable program approval or professional council information", "The exact campus, course and degree title", "Full fee basis and scholarship continuation rules", "Official payment account and receipt process", "Hostel, food, transport and clinical or laboratory charges", "Refund terms and admission cancellation conditions"].map((item) => <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Our Commitment to Better Guidance</h2>
            <p className="mt-4 leading-relaxed text-text-muted">University options and fee information will continue to grow on this website. We update the portal as new verified details become available, while avoiding public claims based only on the size of a list.</p>
            <p className="mt-4 leading-relaxed text-text-muted">Students should still confirm current information before payment because university policies, scholarships, room types and admission routes can change by intake.</p>
            <Button variant="accent" className="mt-6" asChild><Link href="/contact">Talk to AIMS Global</Link></Button>
          </div>
        </div>
      </section>

      <FaqSection items={aboutFaqs} title="About AIMS Global FAQs" />

      <section className="bg-bg-light py-14 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-text-primary">Visit AIMS Global in Butwal</h2>
          <p className="mt-4 text-text-muted">{ADDRESS}</p>
          <p className="mt-2 text-text-muted">Phone: {PHONE} · Email: {EMAIL}</p>
          <p className="mt-2 text-sm text-text-muted">Office Hours: Sun-Fri, 9:00 AM-6:00 PM</p>
          <Button variant="accent" className="mt-8" asChild><Link href="/contact">Book Free Counselling</Link></Button>
        </div>
      </section>
    </>
  );
}
