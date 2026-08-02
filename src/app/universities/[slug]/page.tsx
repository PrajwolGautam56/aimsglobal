import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { SchemaOrg } from "@/components/SchemaOrg";
import { SheetImage } from "@/components/SheetImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_URL } from "@/lib/constants";
import { getNaacBadgeClass } from "@/lib/university-shared";
import { getUniversities, getUniversityBySlug } from "@/lib/universities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const universities = await getUniversities();
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) return { title: "University Not Found" };

  return {
    title: uni.metaTitle,
    description: uni.metaDescription,
    keywords: `${uni.name}, ${uni.city}, admission Nepal, AIMS Global`,
    openGraph: {
      title: uni.metaTitle,
      description: uni.metaDescription,
      url: `${SITE_URL}/universities/${slug}`,
      type: "website",
      ...(uni.image && {
        images: [{ url: uni.image, alt: uni.imgAlt }],
      }),
    },
    twitter: {
      card: uni.image ? "summary_large_image" : "summary",
      ...(uni.image && { images: [uni.image] }),
    },
    alternates: { canonical: `${SITE_URL}/universities/${slug}` },
  };
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);
  if (!uni) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: uni.name,
    description: uni.overview,
    url: `${SITE_URL}/universities/${uni.slug}`,
    ...(uni.officialWebsite.startsWith("http") && { sameAs: uni.officialWebsite }),
    ...(uni.image && { image: uni.image }),
    address: {
      "@type": "PostalAddress",
      addressLocality: uni.city,
      addressRegion: uni.state,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <SchemaOrg data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Universities", href: "/universities" }, { name: uni.name }]} />

      <section className="bg-gradient-to-br from-primary to-bg-dark py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <SheetImage
              src={uni.image}
              alt={uni.imgAlt}
              variant="university"
              containerClassName="h-24 w-24 shrink-0 rounded-2xl border-2 border-white/20 shadow-lg sm:h-28 sm:w-28"
              className="object-contain p-2"
              priority
            />
            <div className="flex-1">
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl">{uni.name}</h1>
            {uni.naacGrade !== "—" && (
              <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${getNaacBadgeClass(uni.naacGrade)}`}>
                NAAC {uni.naacGrade}
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
              <MapPin className="mr-1 h-3 w-3" /> {uni.city}
            </Badge>
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white">{uni.state}</Badge>
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white">{uni.type}</Badge>
            {uni.nirfRanking !== "—" && (
              <Badge variant="accent">NIRF: {uni.nirfRanking}</Badge>
            )}
          </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { label: "Fee Guide", value: uni.annualFees },
            { label: "Top Course", value: uni.topCourse },
            { label: "Highest Package", value: uni.highestPackage },
            { label: "Type", value: uni.type },
          ].map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-xs text-text-muted">{item.label}</p>
              <p className="mt-1 font-semibold text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses & Fees</TabsTrigger>
                <TabsTrigger value="placements">Placements</TabsTrigger>
                <TabsTrigger value="admission">Admission</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">About {uni.name}</h2>
                  <p className="mt-4 leading-relaxed text-text-primary">{uni.overview}</p>
                  <p className="mt-4 leading-relaxed text-text-muted">{uni.keyHighlights}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Key Highlights</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-text-muted">
                    {uni.keyHighlights.split(";").map((h) => (
                      <li key={h.trim()}>{h.trim()}</li>
                    ))}
                  </ul>
                </div>
                {uni.officialWebsite.startsWith("http") && (
                  <Button variant="outline" asChild>
                    <a href={uni.officialWebsite} target="_blank" rel="noopener noreferrer">
                      Official Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </TabsContent>

              <TabsContent value="courses">
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="font-semibold">Check the fee basis before comparing prices.</p>
                  <p className="mt-1">
                    Rows may show total tuition, a full package, or a yearly fee. Amounts can change by intake,
                    scholarship, room type and admission route. Confirm the written offer before payment.
                  </p>
                  {(uni.feeUpdatedAt || uni.feeSource) && (
                    <p className="mt-2 text-xs text-amber-800">
                      {uni.feeUpdatedAt && `Updated ${uni.feeUpdatedAt}`}
                      {uni.feeUpdatedAt && uni.feeSource && " · "}
                      {uni.feeSource && `Source: ${uni.feeSource}`}
                      {uni.feeSourceUrl && (
                        <>
                          {" · "}
                          <a className="font-semibold underline" href={uni.feeSourceUrl} target="_blank" rel="noopener noreferrer">
                            Official fee page
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-bg-light">
                      <tr>
                        {["Course", "Duration", "Fee", "Basis", "Includes", "Eligibility", "Entrance Exam", "Notes"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-semibold text-text-primary">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uni.coursesFees.map((row, rowIndex) => (
                        <tr key={`${row.course}-${rowIndex}`} className="border-t border-border">
                          <td className="px-4 py-3 font-medium">{row.course}</td>
                          <td className="px-4 py-3 text-text-muted">{row.duration}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-text-primary">{row.annualFee}</td>
                          <td className="min-w-32 px-4 py-3 text-text-muted">{row.feeBasis || uni.feeBasis || "Confirm"}</td>
                          <td className="min-w-40 px-4 py-3 text-text-muted">{row.inclusions || "Tuition only unless stated"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.eligibility}</td>
                          <td className="px-4 py-3 text-text-muted">{row.entranceExam}</td>
                          <td className="min-w-48 px-4 py-3 text-text-muted">{row.notes || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {uni.feeNotes && uni.feeNotes.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold text-text-primary">Fee Notes & Extra Costs</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-muted">
                      {uni.feeNotes.map((note) => <li key={note}>{note}</li>)}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="placements" className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border p-5">
                    <p className="text-sm text-text-muted">Average Package</p>
                    <p className="mt-1 text-2xl font-bold text-primary">{uni.placements.averagePackage}</p>
                  </div>
                  <div className="rounded-xl border border-border p-5">
                    <p className="text-sm text-text-muted">Highest Package</p>
                    <p className="mt-1 text-2xl font-bold text-primary">{uni.placements.highestPackage}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Top Recruiters</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {uni.placements.recruiters.map((r) => (
                      <Badge key={r} variant="outline">{r}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admission" className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary">Admission Process</h3>
                  <ol className="mt-4 list-decimal space-y-3 pl-5 text-text-muted">
                    {uni.admissionSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Documents Required</h3>
                  <ul className="mt-4 space-y-2">
                    {uni.documentsRequired.map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-text-muted">
                        <span className="text-success">✓</span> {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
                  <p className="text-sm text-text-primary">
                    <strong>AIMS Global Assistance:</strong> We provide end-to-end support for {uni.name} admission – from counselling to document verification and fee payment guidance.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-text-primary">Apply Now</h2>
              <p className="mt-2 text-sm text-text-muted">Get free counselling for {uni.name}</p>
              <div className="mt-6">
                <ContactForm compact defaultUniversity={uni.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
