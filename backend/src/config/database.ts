import { Client } from "pg";
import fs from "fs";

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,  
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

export const client = new Client(config);

export async function testDbConnection() {
  try {
    await client.connect();
    const result = await client.query("SELECT VERSION()");
    console.log("✅ DB Connected:", result.rows[0]);
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  } finally {
    await client.end();
  }
}
