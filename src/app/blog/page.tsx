import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, CheckCircle2, FileSearch, RefreshCw } from "lucide-react";
import { BlogPageClient } from "@/components/BlogPageClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaOrg } from "@/components/SchemaOrg";
import { BLOG_CATEGORIES, getPublishedBlogPosts } from "@/lib/blogs";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Study in India Blog for Nepali Students",
  description: "Read practical AIMS Global guides about India admission, BBA, MBA, B.Tech, nursing, pharmacy, scholarships, NOC, fees and college selection.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Study in India Guides from AIMS Global",
    description: "Course, fee, scholarship, document and university guidance for Nepali students planning to study in India.",
    url: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Study in India Guides for Nepali Students",
    url: `${SITE_URL}/blog`,
    publisher: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL },
    hasPart: posts.map((post) => ({ "@type": "Article", name: post.title, url: `${SITE_URL}/blog/${post.slug}` })),
  };

  return (
    <>
      <SchemaOrg data={collectionSchema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <section className="bg-bg-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-sm font-semibold uppercase text-accent">AIMS Global Knowledge Centre</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Study in India Guides for Nepali Students</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">Practical guidance on courses, university selection, fees, scholarships, documents, NOC preparation, safety and student life in India.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Research Before You Apply</h2>
            <p className="mt-4 leading-relaxed text-text-muted">These articles are written for Nepali students and parents making real admission decisions. They explain questions that often get missed in a brochure: whether the course fits your background, what a fee package includes, how scholarships continue, which recognition to verify and which documents to prepare.</p>
            <p className="mt-4 leading-relaxed text-text-muted">Use the guides to build your questions, then confirm current facts with the relevant university and official authority. Admission rules, fees, accommodation and professional registration requirements can change.</p>
          </div>
          <div className="border-l-4 border-accent bg-bg-light p-6">
            <h3 className="font-bold text-text-primary">Start Here</h3>
            <div className="mt-4 space-y-3">
              <Link href="/blog/study-in-india-from-nepal-guide" className="block text-sm font-semibold text-primary-light hover:underline">Complete study in India guide</Link>
              <Link href="/blog/best-education-consultancy-butwal-india-admission" className="block text-sm font-semibold text-primary-light hover:underline">How to choose an India consultancy in Butwal</Link>
              <Link href="/blog/noc-india-study-nepal-documents" className="block text-sm font-semibold text-primary-light hover:underline">NOC document planning guide</Link>
              <Link href="/blog/india-scholarships-nepali-students-guide" className="block text-sm font-semibold text-primary-light hover:underline">India scholarship planning guide</Link>
            </div>
          </div>
        </div>
      </section>

      <BlogPageClient posts={posts} categories={[...BLOG_CATEGORIES]} />

      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary">How We Prepare Guidance</h2>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {[
              { icon: FileSearch, title: "Check the Decision Details", text: "Focus on recognition, curriculum, fee basis, scholarship terms, practical training and documents that affect a student's decision." },
              { icon: BookOpenCheck, title: "Explain the Trade-Offs", text: "Avoid presenting one course or university as perfect for every student; show what should be compared and why." },
              { icon: RefreshCw, title: "Review Changing Information", text: "Treat fees, admission rules and official procedures as time-sensitive and direct readers to current written sources." },
            ].map((item) => <div key={item.title} className="bg-white p-6"><item.icon className="h-7 w-7 text-accent" /><h3 className="mt-4 font-bold text-text-primary">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p></div>)}
          </div>
          <p className="mt-8 flex max-w-4xl gap-3 leading-relaxed text-text-muted"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />Content is general educational guidance, not a guarantee of admission, scholarship, registration, placement or salary. Verify current requirements before payment.</p>
        </div>
      </section>
    </>
  );
}
