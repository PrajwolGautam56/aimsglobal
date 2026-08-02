import { redirect } from "next/navigation";
import { saveSettingsAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/constants";
import { hasMongoConfig } from "@/lib/mongodb";

export const metadata = {
  title: "SEO Settings | AIMS Global Admin",
};

export default async function SeoSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const settings = await getSiteSettings();

  return (
    <AdminShell>
      <form action={saveSettingsAction} className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">SEO Settings</h1>
            <p className="mt-2 text-text-muted">Global SEO controls and submission links.</p>
          </div>
          <Button type="submit" variant="accent">Save Settings</Button>
        </div>

        {!hasMongoConfig() && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            MongoDB is not configured yet. Admin changes are currently saved to the project&apos;s local JSON data.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4 rounded-lg border border-border bg-white p-5">
            <div className="space-y-2">
              <Label htmlFor="title">Default Site Title</Label>
              <Input id="title" name="title" defaultValue={settings.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Default Meta Description</Label>
              <Textarea id="description" name="description" defaultValue={settings.description} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Default Keywords</Label>
              <Textarea id="keywords" name="keywords" defaultValue={settings.keywords} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <input type="checkbox" name="robotsIndex" defaultChecked={settings.robotsIndex} />
              Allow search engines to index the site
            </label>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white p-5">
              <h2 className="font-bold text-text-primary">Google Search Console</h2>
              <div className="mt-4 space-y-3 text-sm text-text-muted">
                <p>Sitemap URL:</p>
                <code className="block rounded-md bg-bg-light p-3 text-xs text-text-primary">{SITE_URL}/sitemap.xml</code>
                <p>Robots URL:</p>
                <code className="block rounded-md bg-bg-light p-3 text-xs text-text-primary">{SITE_URL}/robots.txt</code>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-white p-5">
              <h2 className="font-bold text-text-primary">Yoast/RankMath Style Controls</h2>
              <p className="mt-3 text-sm text-text-muted">
                Each university and blog form includes meta title, meta description, focus keyword, clean slug,
                publish status, featured flag, and an SEO score checklist.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-white p-5">
              <h2 className="font-bold text-text-primary">Cloudinary Connected</h2>
              <p className="mt-3 text-sm text-text-muted">
                Blog featured images and university logos can be uploaded directly from their admin forms.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </AdminShell>
  );
}
