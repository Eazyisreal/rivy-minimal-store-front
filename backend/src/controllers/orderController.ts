import { Request, Response } from "express";

import Order from "../models/order";
import OrderItem from "../models/orderItem";
import { sendResponse } from "../middleware/requestHandler";

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders (with items)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders with order items
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: "orderItems" }],
    });
    return sendResponse(res, 200, orders, "Orders fetched successfully");
  } catch (err) {
    return sendResponse(res, 500, null, "Failed to fetch orders");
  }
};

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID (with items)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Order details with items
 *       404:
 *         description: Order not found
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: "orderItems" }],
    });
    if (!order) {
      return sendResponse(res, 404, null, "Order not found");
    }
    return sendResponse(res, 200, order, "Order fetched successfully");
  } catch (err) {
    return sendResponse(res, 500, null, "Failed to fetch order");
  }
};
