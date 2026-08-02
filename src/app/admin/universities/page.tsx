import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllUniversities } from "@/lib/universities";

export const metadata = {
  title: "Universities Admin | AIMS Global",
};

export default async function AdminUniversitiesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const universities = await getAllUniversities();

  return (
    <AdminShell>
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Universities</h1>
          <p className="mt-2 text-text-muted">Edit college details, logos, courses, fees, and SEO fields.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/universities/new">Add University</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-bg-light text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.slug} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-text-primary">{university.name}</td>
                <td className="px-4 py-3 text-text-muted">{university.city}</td>
                <td className="px-4 py-3 text-text-muted">{university.annualFees}</td>
                <td className="px-4 py-3 text-text-muted">{university.status}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/universities/${university.slug}`} className="font-semibold text-primary-light">
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
