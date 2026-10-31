"use client";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";

export function ContactFormWithParams() {
  const params = useSearchParams();
  return (
    <ContactForm
      defaultUniversity={params.get("university") ?? undefined}
      defaultCourse={params.get("course") ?? undefined}
    />
  );
}
