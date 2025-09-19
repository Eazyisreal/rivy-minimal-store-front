import { Request, Response } from "express";

import Category from "../models/category";
import logger from "../config/logger";
import { sendResponse } from "../middleware/requestHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         parentId:
 *           type: string
 *           nullable: true
 *         subCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories (with subcategories)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories with subcategories
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
 *                     $ref: '#/components/schemas/Category'
 */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Category, as: "subCategories" }],
    });

    return sendResponse(res, 200, categories, "Categories fetched successfully");
  } catch (err: any) {
    logger.error("Error fetching categories", {
      message: err.message,
      stack: err.stack,
      query: req.query,
    });
    return sendResponse(res, 500, null, "Failed to fetch categories");
  }
};
