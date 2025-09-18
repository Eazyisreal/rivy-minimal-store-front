import { getProductById, getProducts } from "../controllers/productControllers";

import { Router } from "express";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
