import { Router } from "express";
import { processCheckout } from "../controllers/checkoutController";

const router = Router();
router.post("/", processCheckout);

export default router;
