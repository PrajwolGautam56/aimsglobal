import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ADDRESS, EMAIL, PHONE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Read how AIMS Global collects and uses enquiry information submitted through the education consultancy website.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Notice" }]} />
      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Privacy Notice</h1>
          <p className="mt-4 max-w-3xl text-white/80">How AIMS Global handles information shared through this website.</p>
          <p className="mt-3 text-sm text-white/60">Last updated: 2 August 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font-bold text-text-primary">Information We Collect</h2>
          <p className="mt-4 leading-relaxed text-text-muted">When you send an enquiry, we may collect your name, email address, WhatsApp or phone number, city, course and university interests, message, and the page from which the enquiry was submitted.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">How We Use It</h2>
          <p className="mt-4 leading-relaxed text-text-muted">We use enquiry information to respond, discuss course and admission options, organise follow-up, improve our guidance and maintain a record of the conversation. We do not use an enquiry to guarantee admission, scholarship, placement or another university-controlled outcome.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">Service Providers</h2>
          <p className="mt-4 leading-relaxed text-text-muted">The website may use hosting, database, email, spreadsheet, analytics or media services to operate. Enquiry details may be processed by the service used to store the enquiry or send a reply. We aim to share only what is needed for that function.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">University Applications</h2>
          <p className="mt-4 leading-relaxed text-text-muted">If you choose to proceed with an application, additional academic, identity and admission documents may be required. AIMS Global will explain the intended recipient and purpose before submitting application documents to an institution or authorised admission channel.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">Retention and Security</h2>
          <p className="mt-4 leading-relaxed text-text-muted">We retain information for enquiry follow-up, admission support and reasonable business records. We use practical safeguards, but no online storage or transmission method can be guaranteed completely secure. Do not send unnecessary sensitive documents through public groups or unverified contacts.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">Your Choices</h2>
          <p className="mt-4 leading-relaxed text-text-muted">You may ask what enquiry information we hold, request a correction, or request deletion where retention is not required for an ongoing service or legal record. Contact us using the details below.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-text-primary">Contact AIMS Global</h2>
          <p className="mt-4 leading-relaxed text-text-muted">{ADDRESS}<br />Phone: {PHONE}<br />Email: {EMAIL}</p>
          <Button variant="accent" className="mt-6" asChild><Link href="/contact">Contact Us</Link></Button>
        </section>
      </article>
    </>
  );
}
