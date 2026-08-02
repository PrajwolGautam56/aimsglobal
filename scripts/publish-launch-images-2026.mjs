import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import nextEnv from "@next/env";
import sharp from "sharp";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const generatedDir = path.join(process.env.HOME, ".codex", "generated_images", "019ead44-608c-79c1-9db6-dfd68b3b82b6");
const blogOutputDir = path.join(process.cwd(), "public", "blog-images");
const brandOutputDir = path.join(process.cwd(), "public", "brand");
const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");

const assets = [
  { slug: "homepage-hero-education-consultancy-butwal", source: "exec-c47b9711-18f0-4bc6-940d-fa421397a83c.png", kind: "brand", folder: "aims-global/site" },
  { slug: "best-education-consultancy-butwal-india-admission", source: "exec-a4e7bccf-e73b-4fec-9093-783eb8962de4.png", kind: "blog", folder: "aims-global/blogs" },
  { slug: "bba-in-india-nepali-students-guide", source: "exec-1a2ea978-9279-420b-bd29-ab258e3ccdda.png", kind: "blog", folder: "aims-global/blogs" },
  { slug: "mba-in-india-nepali-students-guide", source: "exec-9c7dbfff-0cd0-4594-a3aa-e7ba40e91558.png", kind: "blog", folder: "aims-global/blogs" },
  { slug: "btech-in-india-nepali-students-guide", source: "exec-21e59f77-67b8-408f-b284-e4e37a2c6d8b.png", kind: "blog", folder: "aims-global/blogs" },
  { slug: "india-scholarships-nepali-students-guide", source: "exec-d066467d-d728-4d81-99f0-b7c659f49049.png", kind: "blog", folder: "aims-global/blogs" },
  { slug: "noc-india-study-nepal-documents", source: "exec-dd641df6-9821-4fd1-8617-c3833ebed7c1.png", kind: "blog", folder: "aims-global/blogs" },
];

function cloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary credentials are missing from .env.local");
  return { cloudName, apiKey, apiSecret };
}

async function uploadImage(filePath, publicId, folder) {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureParams = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = createHash("sha1").update(`${signatureParams}${apiSecret}`).digest("hex");
  const fileBuffer = await readFile(filePath);
  const body = new FormData();
  body.append("file", new Blob([fileBuffer], { type: "image/webp" }), `${publicId}.webp`);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("folder", folder);
  body.append("public_id", publicId);
  body.append("overwrite", "true");
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body });
  const result = await response.json();
  if (!response.ok || !result.secure_url) throw new Error(result.error?.message || `Upload failed for ${publicId}`);
  return result.secure_url;
}

await Promise.all([mkdir(blogOutputDir, { recursive: true }), mkdir(brandOutputDir, { recursive: true })]);

const cloudUrls = new Map();
for (const asset of assets) {
  const source = path.join(generatedDir, asset.source);
  const outputDir = asset.kind === "blog" ? blogOutputDir : brandOutputDir;
  const output = path.join(outputDir, `${asset.slug}.webp`);
  await sharp(source).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(output);
  const url = await uploadImage(output, asset.slug, asset.folder);
  cloudUrls.set(asset.slug, url);
  console.log(`Published ${asset.slug}`);
}

const blogs = JSON.parse(await readFile(blogsFile, "utf8"));
for (const post of blogs) {
  const url = cloudUrls.get(post.slug);
  if (url) post.image = url;
}
await writeFile(blogsFile, `${JSON.stringify(blogs, null, 2)}\n`);

console.log("Launch images are stored locally, uploaded to Cloudinary and linked from blog data.");
