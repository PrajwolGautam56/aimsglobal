import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Login",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-light px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-accent">AIMS Global CMS</p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary">Admin Login</h1>
        <p className="mt-2 text-sm text-text-muted">Manage universities, courses, blogs, metadata, and sitemap content.</p>
        {!isAdminConfigured() && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before using the admin panel.
          </p>
        )}
        {params.error && <p className="mt-4 text-sm font-semibold text-red-600">Invalid password.</p>}
        <form action={loginAction} className="mt-6 space-y-4">
          <Input name="email" type="email" placeholder="Admin email" required />
          <Input name="password" type="password" placeholder="Admin password" required />
          <Button type="submit" className="w-full" variant="accent">
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
