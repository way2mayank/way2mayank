import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/create-category", requireSignin, isAdmin, createCategory);
router.put("/update-category/:id", requireSignin, isAdmin, updateCategory);
router.get("/get-category", getAllCategory);
router.get("/category/:slug", getCategoryById);
router.delete("/delete-category/:id", requireSignin, isAdmin, deleteCategory);

export default router;
