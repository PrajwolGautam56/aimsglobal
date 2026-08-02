import type { Metadata } from "next";
import { BookOpenCheck, CheckCircle2, Clock, FileCheck2, Mail, MapPin, Phone, WalletCards } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SchemaOrg } from "@/components/SchemaOrg";
import { Button } from "@/components/ui/button";
import { createFaqSchema } from "@/lib/course-guides";
import { ADDRESS, EMAIL, PHONE, SITE_URL, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Contact AIMS Global | Free Counselling Butwal" },
  description: "Contact AIMS Global at Finance Chowk, Butwal for India admission counselling, course comparison, fees, scholarships and document guidance.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact AIMS Global Education Consultancy Butwal",
    description: "Speak with AIMS Global about management, engineering, pharmacy, allied health, paramedical and nursing study options in India.",
    url: `${SITE_URL}/contact`,
  },
};

interface PageProps {
  searchParams: Promise<{ university?: string; course?: string }>;
}

const contactFaqs: FaqItem[] = [
  { question: "Is the first counselling discussion free?", answer: "Yes. Students and parents can begin with a free discussion about course interests, academic background, preferred location and budget." },
  { question: "Do I need to visit the Butwal office to start?", answer: "No. You can start by phone, WhatsApp or the online enquiry form. In-person counselling is available at the Finance Chowk office." },
  { question: "What should I bring for counselling?", answer: "Bring or send clear copies of your recent marksheets, information about your current qualification, preferred courses and a realistic budget range. Do not send original documents through unofficial channels." },
  { question: "Can parents join the counselling session?", answer: "Yes. Parent involvement is helpful when comparing fees, scholarships, accommodation, payment schedules and admission conditions." },
  { question: "Will AIMS Global guarantee admission or a scholarship?", answer: "No responsible consultancy can guarantee an outcome controlled by a university. AIMS Global helps prepare and coordinate the application, while the institution makes the final admission and scholarship decision." },
];

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <SchemaOrg data={createFaqSchema(contactFaqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">Free Initial Discussion</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Contact AIMS Global in Butwal</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">Discuss India courses, university options, fees, scholarships, documents and current admission steps with our team.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-9">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Visit, Call or Message</h2>
              <p className="mt-3 leading-relaxed text-text-muted">Students across Nepal can begin remotely. For an in-person meeting, visit our office in central Butwal.</p>
              <div className="mt-6 space-y-4">
                <p className="flex items-start gap-3 text-text-muted"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" />{ADDRESS}</p>
                <p className="flex items-center gap-3 text-text-muted"><Phone className="h-5 w-5 shrink-0 text-primary-light" /><a href={`tel:+977${PHONE.replace(/-/g, "")}`} className="hover:text-primary-light">{PHONE}</a></p>
                <p className="flex items-center gap-3 text-text-muted"><Mail className="h-5 w-5 shrink-0 text-primary-light" /><a href={`mailto:${EMAIL}`} className="hover:text-primary-light">{EMAIL}</a></p>
                <p className="flex items-center gap-3 text-text-muted"><Clock className="h-5 w-5 shrink-0 text-primary-light" />Sun-Fri, 9:00 AM-6:00 PM (NPT)</p>
              </div>
            </div>

            <Button variant="accent" asChild><a href={whatsappHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></Button>

            <div className="overflow-hidden rounded-lg border border-border">
              <iframe title="AIMS Global Office Location" src="https://maps.google.com/maps?q=Finance+Chowk+Butwal+Nepal&output=embed" className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-2xl font-bold text-text-primary">Send an Admission Enquiry</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">Tell us your current qualification, course interest and key questions. A counsellor will review the details and contact you.</p>
            <div className="mt-6"><ContactForm defaultUniversity={params.university} defaultCourse={params.course} /></div>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary">What Counselling Covers</h2>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {[
              { icon: BookOpenCheck, title: "Course Direction", text: "Understand eligibility, curriculum, specialisations and likely career pathways before choosing a college." },
              { icon: WalletCards, title: "Fee Planning", text: "Compare tuition, hostel, food, examinations, deposits, scholarship conditions and other likely costs." },
              { icon: FileCheck2, title: "Admission Documents", text: "Prepare consistent academic, identity and course-specific documents for the current application process." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6"><item.icon className="h-7 w-7 text-accent" /><h3 className="mt-4 font-bold text-text-primary">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Bring These Details</h2>
            <ul className="mt-6 space-y-4">
              {["Your latest academic qualification and marks", "Grade 12 subjects or bachelor's degree details", "Preferred course or possible study areas", "Cities or states you would consider", "Tuition and living budget range", "Any scholarship, hostel or career questions", "Expected intake or admission timeline"].map((item) => <li key={item} className="flex gap-3 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>)}
            </ul>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text-primary">What Happens Next?</h2>
            <ol className="mt-6 space-y-4">
              {["We review the details in your enquiry", "A counsellor discusses course and eligibility questions", "Suitable options are compared by cost and study fit", "You decide whether to begin an application", "Documents and official next steps are organised"].map((item, index) => <li key={item} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{index + 1}</span><span className="pt-1 text-text-primary">{item}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <FaqSection items={contactFaqs} title="Counselling and Contact FAQs" />
    </>
  );
}
