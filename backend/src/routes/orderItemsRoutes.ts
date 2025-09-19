import { Router } from "express";
import { getOrderItems } from "../controllers/orderItemController";

const router = Router();
router.get("/", getOrderItems);

export default router;
