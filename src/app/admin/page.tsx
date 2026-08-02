import Link from "next/link";
import { redirect } from "next/navigation";
import { Database, FileText, GraduationCap, Search } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPublishedBlogPosts, getBlogPosts } from "@/lib/blogs";
import { hasMongoConfig } from "@/lib/mongodb";
import { getUniversities } from "@/lib/universities";

export const metadata = {
  title: "Admin Dashboard | AIMS Global",
};

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [universities, blogs, published] = await Promise.all([
    getUniversities(),
    getBlogPosts(),
    getPublishedBlogPosts(),
  ]);

  const cards = [
    { label: "Active Universities", value: universities.length, icon: GraduationCap, href: "/admin/universities" },
    { label: "Blog Drafts + Posts", value: blogs.length, icon: FileText, href: "/admin/blogs" },
    { label: "Published Blogs", value: published.length, icon: Search, href: "/admin/blogs" },
    { label: "MongoDB", value: hasMongoConfig() ? "Ready" : "Missing", icon: Database, href: "/admin/seo" },
  ];

  return (
    <AdminShell>
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="mt-2 text-text-muted">CMS control center for AIMS Global content and SEO.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/universities/new">New University</Link>
          </Button>
          <Button asChild variant="accent">
            <Link href="/admin/blogs/new">New Blog</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="rounded-lg border border-border bg-white p-5 shadow-sm">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-2xl font-bold text-text-primary">{card.value}</p>
              <p className="text-sm text-text-muted">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <section className="rounded-lg border border-border bg-white p-6">
        <h2 className="text-xl font-bold text-text-primary">Workflow</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="font-semibold text-text-primary">1. Seed MongoDB</p>
            <p className="mt-1 text-sm text-text-muted">Run the seed script once after adding MONGODB_URI.</p>
          </div>
          <div>
            <p className="font-semibold text-text-primary">2. Edit Content</p>
            <p className="mt-1 text-sm text-text-muted">Update college data, fees, metadata, and blog drafts here.</p>
          </div>
          <div>
            <p className="font-semibold text-text-primary">3. Publish + Submit Sitemap</p>
            <p className="mt-1 text-sm text-text-muted">Published pages automatically appear in sitemap.xml.</p>
          </div>
        </div>
      </section>
    </div>
    </AdminShell>
  );
}
