import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import nextEnv from "@next/env";
import sharp from "sharp";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const generatedDir = path.join(
  process.env.HOME,
  ".codex/generated_images/019ead44-608c-79c1-9db6-dfd68b3b82b6"
);
const outputDir = path.join(process.cwd(), "public", "blog-images");
const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");

const images = [
  ["study-in-india-from-nepal-guide", "exec-d832a2ee-7c71-44e2-a597-f358995943fc.png"],
  ["top-engineering-colleges-bangalore-nepali-students", "exec-cc016627-4d72-43e3-9974-5f631670183d.png"],
  ["pharmacy-allied-health-india-nepali-students", "exec-7f4dd74d-a10c-4937-ac01-04ee85d0c181.png"],
  ["srm-university-vs-amrita-university-nepali-students", "exec-7b06a6c4-95e2-48df-97a7-14202c768104.png"],
  ["parul-university-admission-nepali-students-2025", "exec-25eb1765-494a-45cd-89a6-945d59548206.png"],
  ["bms-college-engineering-vs-cmrit-bangalore", "exec-cfe323a8-63a7-4715-a735-099ae88d93c1.png"],
  ["management-courses-india-nepali-students", "exec-63631257-8ace-4182-9339-96295d1b8395.png"],
  ["study-in-bangalore-guide-nepali-students", "exec-46e4f2eb-9498-40e6-b449-a1a2c6a4d63c.png"],
  ["safe-india-admission-without-fraud-nepali-students", "exec-54778da1-de7f-4009-b1ec-b93440a69387.png"],
  ["alliance-university-bangalore-admission-nepali-students", "exec-2aec0231-9a4f-4074-b4ac-9ebc63747b77.png"],
  ["nursing-india-nepali-students-gnm-bsc", "exec-24409453-aedd-4cd7-9bb5-3ff3c26c1e45.png"],
  ["top-universities-south-india-nepali-students", "exec-58fa4303-8844-4b34-be10-35e43c2793cd.png"],
];

function requireCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are missing from .env.local");
  }
  return { cloudName, apiKey, apiSecret };
}

async function uploadImage(filePath, publicId) {
  const { cloudName, apiKey, apiSecret } = requireCloudinary();
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "aims-global/blogs";
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

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || `Upload failed for ${publicId}`);
  }
  return result.secure_url;
}

const urls = new Map();
for (const [slug, sourceName] of images) {
  const source = path.join(generatedDir, sourceName);
  const output = path.join(outputDir, `${slug}.webp`);
  await sharp(source).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(output);
  const url = await uploadImage(output, slug);
  urls.set(slug, url);
  console.log(`Uploaded ${slug}`);
}

const blogs = JSON.parse(await readFile(blogsFile, "utf8"));
for (const blog of blogs) {
  const imageUrl = urls.get(blog.slug);
  if (imageUrl) blog.image = imageUrl;
}
await writeFile(blogsFile, `${JSON.stringify(blogs, null, 2)}\n`);

console.log(`Published ${urls.size} blog images to Cloudinary and updated blogs.json`);
