"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_LOGO, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="AIMS Global home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND_LOGO} alt="AIMS Global" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-primary transition-colors hover:text-primary-light"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="accent" asChild>
            <Link href="/contact">Apply Now</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-text-primary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-border lg:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-bg-light"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="accent" className="mt-2" asChild>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Apply Now
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
