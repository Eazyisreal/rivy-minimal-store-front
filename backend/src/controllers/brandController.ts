import { Request, Response } from "express";

import Brand from "../models/brand";
import { sendResponse } from "../middleware/requestHandler";

/**
 * @openapi
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands
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
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid }
 *                       name: { type: string }
 */
export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.findAll();
    return sendResponse(res, 200, brands, "Brands fetched successfully");
  } catch (err) {
    return sendResponse(res, 500, null, "Failed to fetch brands");
  }
};
