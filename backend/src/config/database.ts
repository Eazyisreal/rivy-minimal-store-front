import { Sequelize } from "sequelize";
import fs from "fs";

export const sequelize = new Sequelize(
  process.env.DATABASE_DATABASE!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
      },
    },
    logging: false,
  }
);

export async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
}
