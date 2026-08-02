import manifest from "@/data/university-logo-manifest.json";

const logoManifest = manifest as Record<string, string>;

export function getUniversityLogoPath(slug: string): string {
  return logoManifest[slug] || `/logos/${slug}.png`;
}
