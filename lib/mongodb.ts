// lib/mongodb.ts
import { MongoClient, type Db, MongoClientOptions } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://foodrecipe:foodrecipe@chefora.ira8gvx.mongodb.net/?retryWrites=true&w=majority&appName=chefora";

// For Atlas, you should NOT allow invalid certificates!
const MONGODB_OPTIONS: MongoClientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: false, // This must be false for Atlas!
};

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
  await client.connect();

  const db = client.db("chefora");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
