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
 *         brandId: 
 *           type: string
 *         imageUrl: 
 *           type: string
 */

const productQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  search: z.string().optional(),
  category: z.string().optional(),
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
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 statusCode: { type: integer }
 *                 message: { type: string }
 *                 data: 
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid query parameters
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page, search, category, minPrice, maxPrice } =
      productQuerySchema.parse(req.query);

    const limit = 10;
    const offset = (page - 1) * limit;

    const where: any = { price: { [Op.between]: [minPrice, maxPrice] } };
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (category) where.categoryId = category;

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
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               success: { type: boolean }
 *               statusCode: { type: integer }
 *               message: { type: string }
 *               data: 
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
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
