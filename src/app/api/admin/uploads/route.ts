import { createHash } from "crypto";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set(["blogs", "universities", "brand"]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Admin login required." }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: "Cloudinary is not configured." }, { status: 503 });
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get("file");
    const requestedFolder = String(incoming.get("folder") || "blogs");
    const folder = ALLOWED_FOLDERS.has(requestedFolder) ? requestedFolder : "blogs";

    if (!(file instanceof File) || file.size === 0) {
      return Response.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "Only image files are supported." }, { status: 415 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: "Image must be smaller than 10 MB." }, { status: 413 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const cloudinaryFolder = `aims-global/${folder}`;
    const signature = createHash("sha1")
      .update(`folder=${cloudinaryFolder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const upload = new FormData();
    upload.append("file", file);
    upload.append("api_key", apiKey);
    upload.append("timestamp", String(timestamp));
    upload.append("folder", cloudinaryFolder);
    upload.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: upload,
    });
    const result = (await response.json()) as {
      secure_url?: string;
      public_id?: string;
      width?: number;
      height?: number;
      bytes?: number;
      error?: { message?: string };
    };

    if (!response.ok || !result.secure_url) {
      console.error("Cloudinary upload failed:", result.error?.message || response.statusText);
      return Response.json(
        { error: result.error?.message || "Cloudinary upload failed." },
        { status: response.status || 502 }
      );
    }

    return Response.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("Admin media upload error:", error);
    return Response.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}
