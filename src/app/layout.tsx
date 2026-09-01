import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SchemaOrg } from "@/components/SchemaOrg";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteSettings } from "@/lib/cms";
import { ADDRESS, EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

export const revalidate = 300;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.title,
      template: "%s | AIMS Global",
    },
    description: settings.description,
    keywords: settings.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    robots: {
      index: settings.robotsIndex,
      follow: settings.robotsIndex,
      googleBot: {
        index: settings.robotsIndex,
        follow: settings.robotsIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: settings.title,
      description: settings.description,
      images: [{ url: `${SITE_URL}/brand/homepage-hero-education-consultancy-butwal.webp`, alt: "AIMS Global education consultancy in Butwal" }],
    },
    twitter: { card: "summary_large_image" },
    verification: { google: "lHUCB0vb91Vg5bK8KUEla41p9pfkKpqaMcd8yqgcKw8" },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  description:
    "AIMS Global is an India-focused education consultancy in Butwal, Nepal helping students compare supported courses, universities, fees and admission steps.",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/aims-global-logo.png`,
  image: `${SITE_URL}/brand/homepage-hero-education-consultancy-butwal.webp`,
  telephone: "+977-974-3679606",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: "Butwal",
    addressRegion: "Lumbini Province",
    postalCode: "32900",
    addressCountry: "NP",
  },
  areaServed: "Nepal",
  serviceType: "Education Consultancy",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977-974-3679606",
    contactType: "admissions counselling",
    areaServed: "NP",
    availableLanguage: ["English", "Nepali", "Hindi"],
  },
  knowsAbout: [
    "Study in India from Nepal",
    "BBA and MBA admissions",
    "Engineering admissions in India",
    "Pharmacy and allied health admissions",
    "GNM and B.Sc Nursing admissions",
    "India university fee comparison",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${outfit.variable} h-full`}>
      <head>
        <SchemaOrg data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
