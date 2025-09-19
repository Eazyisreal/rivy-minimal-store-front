import swaggerJSDoc from "swagger-jsdoc";

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
        url: "http://rivy-minimal-store-front.onrender.com/api/v1",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
