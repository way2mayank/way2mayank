import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getSingleProducts,
  getProductPhoto,
  deleteProduct,
  updateProduct
} from "../controllers/product.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProduct
);

router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProduct
);

router.get("/get-product", getProducts);
router.get("/get-product/:slug", getSingleProducts);
router.get("/product-photo/:pid", getProductPhoto);
router.delete("/delete-product/:pid", deleteProduct);

export default router;
