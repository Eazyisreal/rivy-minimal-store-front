import app from "./app";
import { testDbConnection } from "./config/database";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  await testDbConnection();
});
