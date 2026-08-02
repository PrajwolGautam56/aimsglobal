"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { contactFormSchema, ENQUIRY_COURSES, type ContactFormData } from "@/lib/enquiry";

const selectClass =
  "flex h-11 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light";

interface ContactFormProps {
  type?: "enquiry" | "blog_query";
  blogPost?: string;
  compact?: boolean;
  defaultCourse?: string;
  defaultUniversity?: string;
}

export function ContactForm({
  type = "enquiry",
  blogPost = "",
  compact = false,
  defaultCourse = "",
  defaultUniversity = "",
}: ContactFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [enquiryId, setEnquiryId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      course: defaultCourse,
      university: defaultUniversity,
      city: "",
      website: "",
      acceptedPrivacy: false,
    },
  });

  async function onSubmit(formData: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourcePage: pathname,
          type,
          blogPost,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setEnquiryId(result.id || "");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 text-lg font-bold text-text-primary">Enquiry Received!</h3>
        {enquiryId && (
          <p className="mt-2 text-sm text-text-muted">
            Reference: <strong className="text-text-primary">{enquiryId}</strong>
          </p>
        )}
        <p className="mt-2 text-sm text-text-muted">Our counsellor will WhatsApp you within 24 hours.</p>
        <Button variant="accent" className="mt-6" asChild>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us now →
          </a>
        </Button>
        <button
          type="button"
          className="mt-4 block w-full text-sm text-primary-light hover:underline"
          onClick={() => setStatus("idle")}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />
      {!compact && (
        <h3 className="text-lg font-bold text-text-primary">Get Free Counselling</h3>
      )}

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="Your full name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">WhatsApp Number *</Label>
          <Input id="phone" placeholder="e.g. 9841234567" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Interested Course</Label>
          <select id="course" className={selectClass} {...register("course")}>
            <option value="">Select course of interest</option>
            {ENQUIRY_COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {!compact && (
          <>
            <div className="space-y-2">
              <Label htmlFor="university">Preferred University</Label>
              <Input id="university" placeholder="University name (optional)" {...register("university")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Your City / District</Label>
              <Input id="city" placeholder="e.g. Butwal, Pokhara" {...register("city")} />
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={compact ? 3 : 4}
          placeholder="Your message or questions..."
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="font-semibold text-[#25D366] hover:underline"
          >
            WhatsApp us directly
          </a>
          .
        </p>
      )}

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" {...register("acceptedPrivacy")} />
          <span>
            I agree that AIMS Global may use these details to respond to my enquiry as described in the{" "}
            <Link href="/privacy" className="font-semibold text-primary-light hover:underline">privacy notice</Link>.
          </span>
        </label>
        {errors.acceptedPrivacy && <p className="mt-1 text-xs text-red-500">{errors.acceptedPrivacy.message}</p>}
      </div>

      <Button type="submit" variant="accent" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Enquiry →"}
      </Button>

      <p className="text-center text-xs text-text-muted">
        Or WhatsApp us:{" "}
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="font-semibold text-[#25D366] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          974-3679606
        </Link>
      </p>
    </form>
  );
}
