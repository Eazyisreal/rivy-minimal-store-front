import { Request, Response } from "express";
import { calculateTotals, decrementProductStock, prepareOrderItems, simulatePayment } from "../utils/checkoutUtils";

import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Product from "../models/product";
import { ZodError } from "zod";
import { checkoutSchema } from "../validation/checkoutValidation";
import logger from "../config/logger";
import { sendResponse } from "../middleware/requestHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     CheckoutRequest:
 *       type: object
 *       required: [items, customerInfo, shippingAddress, paymentMethod]
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId: { type: string, format: uuid }
 *               quantity: { type: integer, minimum: 1 }
 *         customerInfo:
 *           type: object
 *           properties:
 *             email: { type: string, format: email }
 *             firstName: { type: string }
 *             lastName: { type: string }
 *             phone: { type: string }
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street: { type: string }
 *             city: { type: string }
 *             state: { type: string }
 *             zipCode: { type: string }
 *             country: { type: string }
 *         paymentMethod: { type: string, enum: [credit_card, paypal, bank_transfer] }
 * 
 * /checkout:
 *   post:
 *     summary: Process checkout and create order
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckoutRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId: { type: string }
 *                     orderNumber: { type: string }
 *                     total: { type: number }
 *                     status: { type: string }
 *                     estimatedDelivery: { type: string }
 *                     paymentResult: { type: object }
 *       400:
 *         description: Validation error or insufficient stock
 *       500:
 *         description: Server error
 */


export const processCheckout = async (req: Request, res: Response) => {
  try {
    const validatedData = checkoutSchema.parse(req.body);
    const { items, customerInfo, shippingAddress, paymentMethod } = validatedData;

    logger.info("Processing checkout", { customerEmail: customerInfo.email, itemCount: items.length });

    const { orderItemsData, validationErrors } = await prepareOrderItems(items);

    if (validationErrors.length) {
      return sendResponse(res, 400, null, "Product validation failed", { errors: validationErrors });
    }

    const totals = calculateTotals(orderItemsData);

    logger.info("Processing payment", { method: paymentMethod, amount: totals.total });
    const paymentResult = await simulatePayment(paymentMethod, totals.total);

    if (!paymentResult.success) {
      logger.warn("Payment failed", { method: paymentMethod, amount: totals.total, reason: paymentResult.message });
      return sendResponse(res, 400, null, "Payment processing failed", paymentResult);
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const order = await Order.create({
      orderNumber,
      status: 'placed',
      ...totals,
      customerEmail: customerInfo.email,
      customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      customerPhone: customerInfo.phone || null,
      shippingAddress: JSON.stringify(shippingAddress),
      paymentMethod,
      paymentId: paymentResult.paymentId
    });

    const createdOrderItems = [];
    for (const itemData of orderItemsData) {
      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId: itemData.productId,
        quantity: itemData.quantity,
        unitPrice: itemData.unitPrice,
      });
      createdOrderItems.push(orderItem);
    }

    await decrementProductStock(orderItemsData);

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    return sendResponse(res, 201, {
      orderId: order.id,
      orderNumber: order.orderNumber,
      ...totals,
      status: order.status,
      estimatedDelivery: estimatedDelivery.toISOString().split('T')[0],
      paymentResult,
      customerInfo: {
        email: customerInfo.email,
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      },
      itemCount: items.length
    }, "Order placed successfully");

  } catch (error: any) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map(err => ({ field: err.path.join('.'), message: err.message }));
      logger.warn("Checkout validation failed", { errors: validationErrors });
      return sendResponse(res, 400, null, "Validation failed", { errors: validationErrors });
    }
    logger.error("Error processing checkout", { message: error.message, stack: error.stack });
    return sendResponse(res, 500, null, "Failed to process checkout");
  }
};
