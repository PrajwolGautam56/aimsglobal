import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { BlogPost } from "@/lib/blogs";
import type { University } from "@/lib/university-shared";
import { scoreSeo } from "@/lib/cms";

const selectClass =
  "flex h-11 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function lines(items: string[] | undefined) {
  return (items || []).join("\n");
}

function courseFeeLines(university?: University) {
  return (university?.coursesFees || [])
    .map((row) => [
      row.course,
      row.duration,
      row.annualFee,
      row.feeBasis || "",
      row.inclusions || "",
      row.eligibility,
      row.entranceExam,
      row.notes || "",
    ].join(" | "))
    .join("\n");
}

export function SeoChecklist({
  title,
  description,
  slug,
  focusKeyword,
  content,
}: {
  title?: string;
  description?: string;
  slug?: string;
  focusKeyword?: string;
  content?: string;
}) {
  const seo = scoreSeo({ title, description, slug, focusKeyword, content });
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-text-primary">SEO Score</p>
        <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">{seo.score}%</span>
      </div>
      <div className="mt-4 space-y-2">
        {seo.checks.map((check) => (
          <p key={check.label} className="text-sm text-text-muted">
            <span className={check.passed ? "font-bold text-success" : "font-bold text-accent"}>
              {check.passed ? "Pass" : "Fix"}:
            </span>{" "}
            {check.label} - {check.hint}
          </p>
        ))}
      </div>
    </div>
  );
}

export function UniversityForm({ university }: { university?: University }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2">
          <Field label="College/University Name">
            <Input name="name" defaultValue={university?.name} required />
          </Field>
          <Field label="Slug">
            <Input name="slug" defaultValue={university?.slug} required />
          </Field>
          <Field label="City">
            <Input name="city" defaultValue={university?.city} required />
          </Field>
          <Field label="State/Country">
            <Input name="state" defaultValue={university?.state} required />
          </Field>
          <Field label="Type">
            <Input name="type" defaultValue={university?.type} required />
          </Field>
          <Field label="Established">
            <Input name="established" defaultValue={university?.established || "—"} />
          </Field>
          <ImageUploadField
            name="image"
            label="Logo / Image"
            defaultValue={university?.image}
            folder="universities"
            placeholder="Cloudinary URL or /logos/name.png"
          />
          <Field label="Image Alt">
            <Input name="imgAlt" defaultValue={university?.imgAlt} />
          </Field>
        </div>

        <div className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2">
          <Field label="NAAC Grade">
            <Input name="naacGrade" defaultValue={university?.naacGrade || "—"} />
          </Field>
          <Field label="NIRF Ranking">
            <Input name="nirfRanking" defaultValue={university?.nirfRanking || "—"} />
          </Field>
          <Field label="Fee Summary">
            <Input name="annualFees" defaultValue={university?.annualFees} />
          </Field>
          <Field label="Fee Basis">
            <Input name="feeBasis" defaultValue={university?.feeBasis || ""} placeholder="Total package / total tuition / per year" />
          </Field>
          <Field label="Fee Updated At">
            <Input name="feeUpdatedAt" type="date" defaultValue={university?.feeUpdatedAt || ""} />
          </Field>
          <Field label="Fee Source">
            <Input name="feeSource" defaultValue={university?.feeSource || ""} />
          </Field>
          <Field label="Official Fee Source URL">
            <Input name="feeSourceUrl" type="url" defaultValue={university?.feeSourceUrl || ""} />
          </Field>
          <Field label="Highest Package">
            <Input name="highestPackage" defaultValue={university?.highestPackage || "—"} />
          </Field>
          <Field label="Top Course">
            <Input name="topCourse" defaultValue={university?.topCourse} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={university?.status || "Active"} className={selectClass}>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <input type="checkbox" name="isFeatured" defaultChecked={university?.isFeatured} />
            Featured university
          </label>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-white p-5">
          <Field label="Popular Courses">
            <Textarea name="popularCourses" defaultValue={lines(university?.popularCourses)} />
          </Field>
          <Field label="Overview">
            <Textarea name="overview" defaultValue={university?.overview} />
          </Field>
          <Field label="Key Highlights">
            <Textarea name="keyHighlights" defaultValue={university?.keyHighlights} />
          </Field>
          <Field label="Official Website">
            <Input name="officialWebsite" defaultValue={university?.officialWebsite} />
          </Field>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-white p-5">
          <Field label="Courses & Fees (course | duration | fee | basis | inclusions | eligibility | entrance | notes)">
            <Textarea name="coursesFees" defaultValue={courseFeeLines(university)} className="min-h-[180px] font-mono text-xs" />
          </Field>
          <Field label="Fee Notes (one per line)">
            <Textarea name="feeNotes" defaultValue={lines(university?.feeNotes)} className="min-h-[120px]" />
          </Field>
          <Field label="Admission Steps">
            <Textarea name="admissionSteps" defaultValue={lines(university?.admissionSteps)} />
          </Field>
          <Field label="Documents Required">
            <Textarea name="documentsRequired" defaultValue={lines(university?.documentsRequired)} />
          </Field>
          <Field label="Average Package">
            <Input name="averagePackage" defaultValue={university?.placements.averagePackage} />
          </Field>
          <Field label="Recruiters">
            <Textarea name="recruiters" defaultValue={lines(university?.placements.recruiters)} />
          </Field>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="space-y-4 rounded-lg border border-border bg-white p-5">
          <Field label="Meta Title">
            <Textarea name="metaTitle" defaultValue={university?.metaTitle} className="min-h-[88px]" required />
          </Field>
          <Field label="Meta Description">
            <Textarea name="metaDescription" defaultValue={university?.metaDescription} required />
          </Field>
        </div>
        <SeoChecklist
          title={university?.metaTitle}
          description={university?.metaDescription}
          slug={university?.slug}
          focusKeyword={university?.name}
          content={university?.overview}
        />
      </aside>
    </div>
  );
}

export function BlogForm({ post }: { post?: BlogPost }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2">
          <Field label="Title">
            <Input name="title" defaultValue={post?.title} required />
          </Field>
          <Field label="Slug">
            <Input name="slug" defaultValue={post?.slug} required />
          </Field>
          <Field label="Category">
            <Input name="category" defaultValue={post?.category || "Study Abroad Guide"} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={post?.status || "Draft"} className={selectClass}>
              <option>Draft</option>
              <option>Ready</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </Field>
          <Field label="Priority">
            <select name="priority" defaultValue={post?.priority || "Medium"} className={selectClass}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </Field>
          <Field label="Published At">
            <Input name="publishedAt" type="date" defaultValue={post?.publishedAt || new Date().toISOString().slice(0, 10)} />
          </Field>
          <ImageUploadField
            name="image"
            label="Featured Image"
            defaultValue={post?.image}
            folder="blogs"
            placeholder="Cloudinary URL or /blog-images/name.png"
          />
          <Field label="Image Alt">
            <Input name="imgAlt" defaultValue={post?.imgAlt || post?.title} />
          </Field>
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <input type="checkbox" name="featured" defaultChecked={post?.featured} />
            Featured blog
          </label>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-white p-5">
          <Field label="Excerpt">
            <Textarea name="excerpt" defaultValue={post?.excerpt} />
          </Field>
          <Field label="Content / Markdown">
            <Textarea name="content" defaultValue={post?.content} className="min-h-[420px] font-mono text-sm" />
          </Field>
        </div>

        <div className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2">
          <Field label="Tags">
            <Textarea name="tags" defaultValue={lines(post?.tags)} />
          </Field>
          <Field label="Outline / H2 headings">
            <Textarea name="outline" defaultValue={post?.outline} />
          </Field>
          <Field label="Internal Links">
            <Textarea name="internalLinks" defaultValue={post?.internalLinks} />
          </Field>
          <Field label="Notes">
            <Textarea name="notes" defaultValue={post?.notes} />
          </Field>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="space-y-4 rounded-lg border border-border bg-white p-5">
          <Field label="Meta Title">
            <Textarea name="metaTitle" defaultValue={post?.metaTitle} className="min-h-[88px]" required />
          </Field>
          <Field label="Meta Description">
            <Textarea name="metaDescription" defaultValue={post?.metaDescription} required />
          </Field>
          <Field label="Focus Keyword">
            <Input name="focusKeyword" defaultValue={post?.focusKeyword} />
          </Field>
          <Field label="Secondary Keywords">
            <Textarea name="secondaryKeywords" defaultValue={post?.secondaryKeywords} />
          </Field>
          <Field label="Target Audience">
            <Input name="targetAudience" defaultValue={post?.targetAudience || "Nepali students"} />
          </Field>
          <Field label="Target Word Count">
            <Input name="wordCount" type="number" defaultValue={post?.wordCount || 1200} />
          </Field>
          <Field label="Author">
            <Input name="author" defaultValue={post?.author || "AIMS Global Team"} />
          </Field>
        </div>
        <SeoChecklist
          title={post?.metaTitle}
          description={post?.metaDescription}
          slug={post?.slug}
          focusKeyword={post?.focusKeyword}
          content={post?.content}
        />
      </aside>
    </div>
  );
}
