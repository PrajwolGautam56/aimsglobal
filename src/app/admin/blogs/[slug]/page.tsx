import { notFound, redirect } from "next/navigation";
import { saveBlogAction } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/AdminFields";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBlogBySlug } from "@/lib/blogs";

export const metadata = {
  title: "Edit Blog | AIMS Global Admin",
};

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <AdminShell>
      <form action={saveBlogAction} className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Edit Blog</h1>
            <p className="mt-2 text-text-muted">{post.title}</p>
          </div>
          <Button type="submit" variant="accent">Save Changes</Button>
        </div>
        <BlogForm post={post} />
        <div className="flex justify-end">
          <Button type="submit" variant="accent">Save Changes</Button>
        </div>
      </form>
    </AdminShell>
  );
}
