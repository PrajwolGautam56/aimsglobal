import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

loadEnvLocal();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "aims_global";

if (!uri) {
  console.error("MONGODB_URI is required. Add it to .env.local or export it before running this script.");
  process.exit(1);
}

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf8"));
}

function withTimestamps(items) {
  const now = new Date().toISOString();
  return items.map((item) => ({
    ...item,
    createdAt: item.createdAt || now,
    updatedAt: now,
  }));
}

async function upsertMany(collection, items, key = "slug") {
  if (!items.length) return;
  await collection.bulkWrite(
    items.map((item) => ({
      updateOne: {
        filter: { [key]: item[key] },
        update: { $set: item },
        upsert: true,
      },
    }))
  );
}

async function main() {
  const universities = withTimestamps(readJson("universities.json"));
  const blogs = withTimestamps(readJson("blogs.json"));
  const siteSettings = readJson("site-settings.json");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  await upsertMany(db.collection("universities"), universities);
  await upsertMany(db.collection("blogs"), blogs);
  await db.collection("siteSettings").updateOne(
    {},
    {
      $set: {
        ...siteSettings,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  await db.collection("universities").createIndex({ slug: 1 }, { unique: true });
  await db.collection("universities").createIndex({ status: 1, isFeatured: -1 });
  await db.collection("blogs").createIndex({ slug: 1 }, { unique: true });
  await db.collection("blogs").createIndex({ status: 1, publishedAt: -1 });
  await db.collection("blogs").createIndex({ title: "text", content: "text", focusKeyword: "text" });

  await client.close();

  console.log(`Seeded ${universities.length} universities and ${blogs.length} blogs into ${dbName}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
