import express from "express";
import { testDbConnection } from "./config/database";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Hello, Idan");
});

app.listen(port, async () => {
  console.log(`🚀 Server running at http://localhost:${port}`);

  await testDbConnection();
});
