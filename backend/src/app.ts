import { apiLimiter } from "./config/rateLimiter";
import brandRoutes from "./routes/brandRoutes";
import categoryRoutes from "./routes/catergoriesRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import express from "express";
import orderItemsRoutes from "./routes/orderItemsRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import { requestLogger } from "./middleware/requestLogger";
import swaggerDocs from "./config/swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

const allowedOrigins =
  process.env.CORS_ORIGINS?.split(",").map(o => o.trim()) || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        process.env.NODE_ENV === "development" ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(requestLogger);
app.use(apiLimiter);

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order-items", orderItemsRoutes);
app.use("/api/v1/checkout", checkoutRoutes);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;
