import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csvPath = path.join(root, "src", "data", "universities_raw.csv");
const logosDir = path.join(root, "public", "logos");
const manifestPath = path.join(root, "src", "data", "university-logo-manifest.json");
const requestTimeoutMs = 12000;
const websiteOverrides = {
  "akash-group-institutions-bangalore": "https://www.akashinstitutions.com/",
  "cambridge-institute-technology-bangalore": "https://engg.cambridge.edu.in/",
  "cmru-cmr-university-bangalore": "https://cmr.edu.in/",
  "easwari-engineering-college-chennai": "https://srmeaswari.ac.in/",
  "sb-group-institutions-bangalore": "https://sbcollege.edu.in/",
  "siddaganga-medical-college-tumkur": "https://smcri.edu.in/",
  "shri-maruthi-group-institutions-karnataka": "https://smgiedu.com/",
  "srm-university-amaravati-andhra-pradesh": "https://www.srmap.edu.in/",
  "srm-trp-engineering-college-trichy": "https://trp.srmtrichy.edu.in/",
  "nagarjuna-college-engineering-bangalore": "https://ncet.co.in/",
  "dhanvantari-group-institutions-bangalore": "https://www.dhanwantariinstitutions.com/",
  "bgs-sjb-group-institutions-bangalore": "https://bgsgroup.org/",
};

function loadExistingManifest() {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

function withTimeout() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  return {
    signal: controller.signal,
    done: () => clearTimeout(timeout),
  };
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field.trim());
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field.trim());
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      field = "";
      if (char === "\r") i++;
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows) {
  const [header, ...data] = rows;
  return data
    .filter((row) => row[0])
    .map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i] ?? "";
      });
      return obj;
    });
}

function safeName(name) {
  return name.replace(/[^a-z0-9-]+/gi, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
}

function extFromContentType(contentType, sourceUrl) {
  const type = (contentType || "").split(";")[0].trim().toLowerCase();
  if (type === "image/svg+xml") return ".svg";
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/jpg") return ".jpg";
  if (type === "image/x-icon" || type === "image/vnd.microsoft.icon") return ".ico";

  const ext = path.extname(new URL(sourceUrl).pathname);
  if (ext && ext.length <= 5) return ext.toLowerCase();
  return ".png";
}

function resolveUrl(candidate, pageUrl) {
  try {
    return new URL(candidate, pageUrl).href;
  } catch {
    return null;
  }
}

async function fetchHtml(url) {
  const timeout = withTimeout();
  const res = await fetch(url, {
    signal: timeout.signal,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
  }).finally(timeout.done);

  if (!res.ok) throw new Error(`HTML fetch failed ${res.status}`);
  return res.text();
}

function extractCandidates(html) {
  const out = [];
  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+name=["']twitter:image(?:\:src)?["'][^>]+content=["']([^"']+)["']/gi,
  ];
  for (const pattern of metaPatterns) {
    for (const match of html.matchAll(pattern)) out.push(match[1]);
  }

  const imgPatterns = [
    /<img[^>]+(?:alt|title)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["'][^>]*>/gi,
    /<img[^>]*src=["']([^"']+)["'][^>]*(?:alt|title)=["'][^"']*logo[^"']*["'][^>]*>/gi,
    /<img[^>]+(?:alt|title)=["'][^"']*logo[^"']*["'][^>]*(?:data-src|data-lazy-src)=["']([^"']+)["'][^>]*>/gi,
    /<img[^>]*(?:data-src|data-lazy-src)=["']([^"']+)["'][^>]*(?:alt|title)=["'][^"']*logo[^"']*["'][^>]*>/gi,
    /<img[^>]+(?:alt|title)=["'][^"']*logo[^"']*["'][^>]*srcset=["']([^"'\s,]+)[^"']*["'][^>]*>/gi,
    /<img[^>]+src=["']([^"']*logo[^"']*)["'][^>]*>/gi,
    /<img[^>]+(?:data-src|data-lazy-src)=["']([^"']*logo[^"']*)["'][^>]*>/gi,
  ];
  for (const pattern of imgPatterns) {
    for (const match of html.matchAll(pattern)) out.push(match[1]);
  }

  const iconPatterns = [
    /<link[^>]+rel=["'][^"']*(?:shortcut icon|icon|apple-touch-icon)[^"']*["'][^>]+href=["']([^"']+)["']/gi,
  ];
  for (const pattern of iconPatterns) {
    for (const match of html.matchAll(pattern)) out.push(match[1]);
  }

  return [...new Set(out)];
}

async function downloadAsset(url, referer) {
  const timeout = withTimeout();
  const res = await fetch(url, {
    signal: timeout.signal,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      ...(referer && { referer }),
    },
  }).finally(timeout.done);
  if (!res.ok) throw new Error(`Asset fetch failed ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type");
  return { buffer, contentType };
}

async function pickLogoSource(website) {
  const html = await fetchHtml(website);
  const candidates = extractCandidates(html);
  for (const candidate of candidates) {
    const resolved = resolveUrl(candidate, website);
    if (!resolved) continue;
    try {
      const asset = await downloadAsset(resolved, website);
      return { url: resolved, ...asset };
    } catch {
      continue;
    }
  }

  const fallbackUrls = [
    new URL("/favicon.ico", website).href,
    new URL("/favicon.png", website).href,
    new URL("/apple-touch-icon.png", website).href,
  ];
  for (const resolved of fallbackUrls) {
    try {
      const asset = await downloadAsset(resolved, website);
      return { url: resolved, ...asset };
    } catch {
      continue;
    }
  }

  throw new Error("No downloadable logo found");
}

function websiteVariants(website) {
  const variants = new Set([website]);
  try {
    const parsed = new URL(website);
    const withoutWww = parsed.hostname.replace(/^www\./, "");
    const withWww = withoutWww.startsWith("www.") ? withoutWww : `www.${withoutWww}`;
    for (const protocol of ["https:", "http:"]) {
      for (const hostname of [withoutWww, withWww]) {
        const variant = new URL(website);
        variant.protocol = protocol;
        variant.hostname = hostname;
        variants.add(variant.href);
      }
    }
  } catch {
    // Keep the original string as the only candidate.
  }
  return [...variants];
}

async function main() {
  fs.mkdirSync(logosDir, { recursive: true });

  const csv = fs.readFileSync(csvPath, "utf8");
  const rows = rowsToObjects(parseCSV(csv));
  const manifest = loadExistingManifest();
  const failed = [];

  for (const raw of rows) {
    const name = raw["University/College Name"];
    const slug = raw["Slug (URL)"];
    const website = websiteOverrides[slug] || (raw["Official Website"] || "").trim();
    if (!slug || !website) {
      failed.push(`${name} (missing website or slug)`);
      continue;
    }

    try {
      let logo = null;
      let lastError = null;
      for (const variant of websiteVariants(website)) {
        try {
          logo = await pickLogoSource(variant);
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (!logo) throw lastError || new Error("No downloadable logo found");

      const ext = extFromContentType(logo.contentType, logo.url);
      const fileName = `${safeName(slug)}${ext}`;
      fs.writeFileSync(path.join(logosDir, fileName), logo.buffer);
      manifest[slug] = `/logos/${fileName}`;
      console.log(`saved ${name} -> ${fileName}`);
    } catch (error) {
      failed.push(`${name}: ${error.message}`);
      console.warn(`failed ${name}: ${error.message}`);
    }
  }

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`wrote manifest with ${Object.keys(manifest).length} logos`);
  if (failed.length) {
    console.log("Failures:");
    for (const item of failed) console.log(`- ${item}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
