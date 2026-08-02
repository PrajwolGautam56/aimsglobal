import { Resend } from "resend";
import { z } from "zod";
import { enquirySchema } from "@/lib/enquiry";
import { ADDRESS, PHONE, WHATSAPP_NUMBER } from "@/lib/constants";

const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (attempts.size > 5000) attempts.clear();
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

async function writeToGoogleSheet(data: z.infer<typeof enquirySchema>) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (!webhook) {
    console.log("Enquiry received while GOOGLE_SHEETS_WEBHOOK is not configured.");
    const year = new Date().getFullYear();
    return { success: true, id: `ENQ-${year}-DEV` };
  }

  const sheetResponse = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    redirect: "follow",
  });

  const text = await sheetResponse.text();
  try {
    return JSON.parse(text) as { success: boolean; id?: string; error?: string };
  } catch {
    console.error("Google Sheets webhook non-JSON response:", text.slice(0, 200));
    throw new Error("Invalid response from enquiry webhook");
  }
}

async function sendStudentAutoReply(data: z.infer<typeof enquirySchema>) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safeName = escapeHtml(data.name);
  const safeCourse = escapeHtml(data.course || "admissions in India");
  const safePhone = escapeHtml(data.phone);
  await resend.emails.send({
    from: "AIMS Global <info@aimsglobal.com.np>",
    to: data.email,
    subject: "Your enquiry has been received — AIMS Global",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;color:#1a1a2e">
        <div style="background:#1B3B8A;padding:20px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">AIMS Global</h1>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">${ADDRESS}</p>
        </div>
        <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
          <p>Dear <strong>${safeName}</strong>,</p>
          <p>Thank you for contacting AIMS Global! We have received your enquiry about <strong>${safeCourse}</strong>.</p>
          <p>Our counsellor will contact you within <strong>24 hours</strong> on your WhatsApp number <strong>${safePhone}</strong>.</p>
          <p>For faster response, WhatsApp us directly:</p>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;margin:8px 0">
            WhatsApp: ${PHONE}
          </a>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
          <p style="font-size:12px;color:#666">
            AIMS Global · ${ADDRESS}<br>
            Phone: ${PHONE} · Email: info@aimsglobal.com.np
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(req: Request) {
  try {
    if (isRateLimited(req)) {
      return Response.json({ success: false, message: "Too many enquiries. Please try again later." }, { status: 429 });
    }
    const body = await req.json();
    const data = enquirySchema.parse(body);

    const sheetResult = await writeToGoogleSheet(data);

    if (!sheetResult.success) {
      throw new Error(sheetResult.error || "Failed to save enquiry");
    }

    try {
      await sendStudentAutoReply(data);
    } catch (emailError) {
      console.error("Enquiry saved, but auto-reply email failed:", emailError);
    }

    return Response.json({
      success: true,
      message: "Enquiry submitted successfully",
      id: sheetResult.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Enquiry API error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please WhatsApp us directly." },
      { status: 500 }
    );
  }
}
