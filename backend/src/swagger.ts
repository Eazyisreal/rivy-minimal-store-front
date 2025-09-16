import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Storefront API", version: "1.0.0" },
  },
  apis: ["./src/controllers/*.ts", "./src/models/*.ts"], 
};

const spec = swaggerJsdoc(options);
export const docsRouter = Router();
docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(spec));
