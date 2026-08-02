import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBlogPosts } from "@/lib/blogs";

export const metadata = {
  title: "Blogs Admin | AIMS Global",
};

export default async function AdminBlogsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const posts = await getBlogPosts();

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Blogs</h1>
            <p className="mt-2 text-text-muted">Write SEO blogs with metadata, schema-ready content, and publish status.</p>
          </div>
          <Button asChild variant="accent">
            <Link href="/admin/blogs/new">Add Blog</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-bg-light text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Keyword</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-text-primary">{post.title}</td>
                  <td className="px-4 py-3 text-text-muted">{post.category}</td>
                  <td className="px-4 py-3 text-text-muted">{post.status}</td>
                  <td className="px-4 py-3 text-text-muted">{post.focusKeyword}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/blogs/${post.slug}`} className="font-semibold text-primary-light">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
