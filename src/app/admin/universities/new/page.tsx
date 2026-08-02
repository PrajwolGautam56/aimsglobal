import { redirect } from "next/navigation";
import { saveUniversityAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { UniversityForm } from "@/components/admin/AdminFields";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "New University | AIMS Global Admin",
};

export default async function NewUniversityPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <AdminShell>
    <form action={saveUniversityAction} className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Add University</h1>
          <p className="mt-2 text-text-muted">Create a new college profile with SEO-ready fields.</p>
        </div>
        <Button type="submit" variant="accent">Save University</Button>
      </div>
      <UniversityForm />
      <div className="flex justify-end">
        <Button type="submit" variant="accent">Save University</Button>
      </div>
    </form>
    </AdminShell>
  );
}
