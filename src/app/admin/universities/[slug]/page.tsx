import { notFound, redirect } from "next/navigation";
import { saveUniversityAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { UniversityForm } from "@/components/admin/AdminFields";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getUniversityBySlugForAdmin } from "@/lib/universities";

export const metadata = {
  title: "Edit University | AIMS Global Admin",
};

export default async function EditUniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { slug } = await params;
  const university = await getUniversityBySlugForAdmin(slug);
  if (!university) notFound();

  return (
    <AdminShell>
    <form action={saveUniversityAction} className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Edit University</h1>
          <p className="mt-2 text-text-muted">{university.name}</p>
        </div>
        <Button type="submit" variant="accent">Save Changes</Button>
      </div>
      <UniversityForm university={university} />
      <div className="flex justify-end">
        <Button type="submit" variant="accent">Save Changes</Button>
      </div>
    </form>
    </AdminShell>
  );
}
