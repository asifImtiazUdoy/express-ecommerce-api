import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);

router.post('/', ProductControllers.createProduct);

router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateProduct);

export const ProductRoutes = router;