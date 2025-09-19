import { getOrderById, getOrders } from "../controllers/orderController";

import { Router } from "express";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
