import { Request, Response } from "express";

import OrderItem from "../models/orderItem";
import Product from "../models/product";
import { sendResponse } from "../middleware/requestHandler";

/**
 * @openapi
 * /order-items:
 *   get:
 *     summary: Get all order items (with product details)
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: List of order items with products
 */
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [{ model: Product, as: "product" }],
    });
    return sendResponse(res, 200, orderItems, "Order items fetched successfully");
  } catch (err) {
    return sendResponse(res, 500, null, "Failed to fetch order items");
  }
};
