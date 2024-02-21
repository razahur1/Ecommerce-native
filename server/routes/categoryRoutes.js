import express from "express";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

//routes
// ============== CAT ROUTES ==================

// CREATE CATEGORY
router.post("/create", isAuth, isAdmin, createCategory);

// GET ALL CATEGORY
router.get("/get-all", getAllCategoriesController);

// DELETE  CATEGORY
router.delete("/delete/:id", isAuth, isAdmin, deleteCategoryController);

// UPDATE ALL CATEGORY
router.put("/update/:id", isAuth, isAdmin, updateCategoryController);

// ====================================================================

export default router;
