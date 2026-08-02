import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SchemaOrg } from "@/components/SchemaOrg";
import { SheetImage } from "@/components/SheetImage";
import { Badge } from "@/components/ui/badge";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getBlogBySlug, getPublishedBlogPosts, getRelatedPosts } from "@/lib/blogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post || !(post.status.toLowerCase().includes("ready") || post.status.toLowerCase() === "published")) {
    return { title: "Post Not Found" };
  }

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: [post.focusKeyword, post.secondaryKeywords].join(", "),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      ...(post.image && {
        images: [{ url: post.image, alt: post.imgAlt }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      ...(post.image && { images: [post.image] }),
    },
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post || !(post.status.toLowerCase().includes("ready") || post.status.toLowerCase() === "published")) {
    notFound();
  }

  const related = await getRelatedPosts(slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: post.author, url: `${SITE_URL}/about` },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: [post.focusKeyword, post.secondaryKeywords].filter(Boolean).join(", "),
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/aims-global-logo.png` },
    },
    ...(post.image && { image: post.image }),
  };

  return (
    <>
      <SchemaOrg data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <SheetImage
              src={post.image}
              alt={post.imgAlt}
              variant="blog"
              containerClassName="mb-6 aspect-[16/9] w-full rounded-2xl border border-border shadow-sm"
              priority
            />
            <Badge variant="accent" className="mb-4">{post.category}</Badge>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.publishedAt}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} min read</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
            </div>
            <div className="mb-8 border-l-4 border-primary bg-bg-light p-4 text-sm leading-relaxed text-text-muted">
              Reviewed for practical admission planning. Fees, scholarships, recognition and official procedures can change; confirm current written information before payment.
            </div>
            <MarkdownContent content={post.content} />
            <div className="mt-10 rounded-lg border border-border bg-bg-light p-6">
              <p className="font-semibold text-text-primary">{post.author}</p>
              <p className="mt-2 text-sm text-text-muted">
                AIMS Global is an India-focused education consultancy in Butwal, Nepal. Our guides help students compare supported courses, fees, documents and admission decisions more clearly.
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-text-primary">Get Free Counselling</h2>
              <p className="mt-2 text-sm text-text-muted">Speak with our experts about studying in India</p>
              <div className="mt-6">
                <ContactForm type="blog_query" blogPost={post.title} compact />
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-8 text-2xl font-bold text-text-primary">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="text-sm font-semibold text-primary-light hover:underline">
                ← Back to Blog
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
