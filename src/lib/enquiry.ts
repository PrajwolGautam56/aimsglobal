import { z } from "zod";

export const ENQUIRY_SHEET_ID = "1A3xFwN17ERu_eYhKl2jKPDTL9AAzK8zXFyLhpieXXWg";

export const ENQUIRY_COURSES = [
  "BBA",
  "BBS",
  "MBA (Management)",
  "B.Tech / B.E. (Engineering)",
  "B.Pharm / D.Pharm (Pharmacy)",
  "Allied Health / Paramedical",
  "GNM Nursing",
  "B.Sc Nursing",
  "Law (LLB)",
  "Design / Architecture",
  "Other",
] as const;

export const enquirySchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone number"),
  course: z.string().optional().default(""),
  university: z.string().optional().default(""),
  city: z.string().optional().default(""),
  message: z.string().min(5, "Message too short"),
  sourcePage: z.string().optional().default("/contact"),
  type: z.enum(["enquiry", "blog_query"]).default("enquiry"),
  blogPost: z.string().optional().default(""),
  website: z.string().max(0).optional().default(""),
  acceptedPrivacy: z.literal(true, { error: "Privacy consent is required" }),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter your WhatsApp number"),
  course: z.string(),
  university: z.string(),
  city: z.string(),
  message: z.string().min(5, "Please write a message"),
  website: z.string().max(0),
  acceptedPrivacy: z.boolean().refine(Boolean, "Please accept the privacy notice"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
