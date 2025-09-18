import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import productRoutes from "./routes/productRoutes";
import rateLimit from "express-rate-limit";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { testDbConnection } from "./config/database";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request started: ${req.method} ${req.url}`);
  res.on("finish", () => {
    logger.info(
      `Request completed: ${req.method} ${req.url} ${res.statusCode}`
    );
  });
  next();
});

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rivy Storefront API",
      version: "1.0.0",
      description: "API documentation for Rivy Storefront",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);


app.use("/api/v1/products", productRoutes);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, async () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  await testDbConnection();
});
