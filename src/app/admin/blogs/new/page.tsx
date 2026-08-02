import { redirect } from "next/navigation";
import { saveBlogAction } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/AdminFields";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "New Blog | AIMS Global Admin",
};

export default async function NewBlogPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <AdminShell>
      <form action={saveBlogAction} className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Add Blog</h1>
            <p className="mt-2 text-text-muted">Draft, optimize, and publish a new SEO article.</p>
          </div>
          <Button type="submit" variant="accent">Save Blog</Button>
        </div>
        <BlogForm />
        <div className="flex justify-end">
          <Button type="submit" variant="accent">Save Blog</Button>
        </div>
      </form>
    </AdminShell>
  );
}
