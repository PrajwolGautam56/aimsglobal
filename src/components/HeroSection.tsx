import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/constants";

const stats = [
  { value: "BBA · BBS · MBA", label: "Management" },
  { value: "B.Tech", label: "Engineering" },
  { value: "B.Pharm", label: "Pharmacy & Allied" },
  { value: "GNM · B.Sc", label: "Nursing" },
];

export function HeroSection() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="relative overflow-hidden bg-bg-dark text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/homepage-hero-education-consultancy-butwal.webp"
        alt="Nepali student and parents receiving India university admission counselling at AIMS Global in Butwal"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 font-accent text-sm font-medium uppercase tracking-widest text-accent-light sm:text-base">
            India Admission Centre · Butwal, Nepal
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Study in India from Nepal with AIMS Global
          </h1>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">
            Compare recognised universities, courses, fees and scholarships with clear admission support from our Finance Chowk office in Butwal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">Get Free Counselling</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px border-y border-white/20 bg-white/20 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-black/35 px-3 py-4 text-center backdrop-blur-sm">
              <p className="text-base font-bold text-accent sm:text-lg">{stat.value}</p>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
