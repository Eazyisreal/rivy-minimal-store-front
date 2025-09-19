import { apiLimiter } from "./config/rateLimiter";
import brandRoutes from "./routes/brandRoutes";
import categoryRoutes from "./routes/catergoriesRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import express from "express";
import orderItemsRoutes from "./routes/orderItemsRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import { requestLogger } from "./middleware/requestLogger";
import swaggerDocs from "./config/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
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
