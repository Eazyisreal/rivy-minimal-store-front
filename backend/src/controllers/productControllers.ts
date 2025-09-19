import { Request, Response } from "express";

import { Op } from "sequelize";
import Product from "../models/product";
import { sendResponse } from "../middleware/requestHandler";
import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         categoryId:
 *           type: string
 *           format: uuid
 *         subCategoryId:
 *           type: string
 *           format: uuid
 *         brandId:
 *           type: string
 *           format: uuid
 *         imageUrl:
 *           type: string
 */

const productQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  categoryId: z
    .string()
    .uuid()
    .optional()
    .transform((val) => val || undefined),
  subCategoryId: z
    .string()
    .uuid()
    .optional()
    .transform((val) => val || undefined),
  brandId: z
    .string()
    .uuid()
    .optional()
    .transform((val) => val || undefined),
  minPrice: z.coerce.number().min(0).default(0),
  maxPrice: z.coerce.number().min(0).default(100000),
});

/**
 * @openapi
 * /products:
 *   get:
 *     summary: List products with pagination and filters
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of products per page (default: 10, max: 100)"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: "Search keyword for product names"
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "Filter products by category ID"
 *       - in: query
 *         name: subCategoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "Filter products by subcategory ID"
 *       - in: query
 *         name: brandId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "Filter products by brand ID"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: "Minimum product price"
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: "Maximum product price"
 *     responses:
 *       200:
 *         description: "List of products"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: "Invalid query parameters"
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const query = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );
    const {
      page,
      limit,
      search,
      categoryId,
      subCategoryId,
      brandId,
      minPrice,
      maxPrice,
    } = productQuerySchema.parse(query);

    const offset = (page - 1) * limit;

    const where: any = { price: { [Op.between]: [minPrice, maxPrice] } };

    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (categoryId) where.categoryId = categoryId;
    if (subCategoryId) where.subCategoryId = subCategoryId;
    if (brandId) where.brandId = brandId;

    const products = await Product.findAll({ where, limit, offset });

    return sendResponse(res, 200, products, "Products fetched successfully");
  } catch (err) {
    return sendResponse(res, 400, null, "Invalid query parameters");
  }
};

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: "The unique ID of the product"
 *     responses:
 *       200:
 *         description: "Product details"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: "Product not found"
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = z.string().uuid().parse(req.params.id);
    const product = await Product.findByPk(id);

    if (!product) {
      return sendResponse(res, 404, null, "Product not found");
    }

    return sendResponse(res, 200, product, "Product fetched successfully");
  } catch (err) {
    return sendResponse(res, 400, null, "Invalid product ID");
  }
};
