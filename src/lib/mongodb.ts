import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "aims_global";

type MongoGlobal = typeof globalThis & {
  _aimsMongoClientPromise?: Promise<MongoClient>;
};

export function hasMongoConfig(): boolean {
  return Boolean(uri);
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  const globalForMongo = globalThis as MongoGlobal;
  if (!globalForMongo._aimsMongoClientPromise) {
    globalForMongo._aimsMongoClientPromise = new MongoClient(uri).connect();
  }

  return globalForMongo._aimsMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function getCollection<T extends object>(name: string) {
  const db = await getDb();
  return db.collection<T>(name);
}
