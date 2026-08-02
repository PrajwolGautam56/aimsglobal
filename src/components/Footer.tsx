import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ADDRESS, BRAND_LOGO, EMAIL, PHONE, SITE_NAME } from "@/lib/constants";

const footerLinks = {
  Universities: [
    { href: "/universities", label: "All Universities" },
    { href: "/universities?state=Karnataka", label: "Karnataka" },
    { href: "/universities?state=Tamil Nadu", label: "Tamil Nadu" },
    { href: "/universities?state=Gujarat", label: "Gujarat" },
  ],
  Courses: [
    { href: "/courses/bba", label: "BBA" },
    { href: "/courses/mba", label: "MBA" },
    { href: "/courses/b-tech", label: "B.Tech" },
    { href: "/courses/b-pharm", label: "B.Pharm" },
    { href: "/courses/bsc-nursing", label: "B.Sc Nursing" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/blog/study-in-india-from-nepal-guide", label: "Study in India Guide" },
    { href: "/blog/noc-india-study-nepal-documents", label: "NOC Guide" },
    { href: "/blog/india-scholarships-nepali-students-guide", label: "Scholarship Guide" },
    { href: "/contact", label: "Free Counselling" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Apply Now" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BRAND_LOGO} alt={SITE_NAME} className="h-16 w-auto rounded bg-white object-contain" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              India-focused education consultancy in Butwal helping Nepali students compare courses, fees, documents and admission options.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 font-semibold text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {ADDRESS}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> {PHONE}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> {EMAIL}</p>
            </div>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. · <Link href="/privacy" className="hover:text-white">Privacy</Link>
            </p>
          </div>
          <p className="mt-4 text-xs text-white/40">
            Course, fee and scholarship details can change. Confirm current written information before payment.
          </p>
        </div>
      </div>
    </footer>
  );
}
