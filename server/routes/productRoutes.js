import express from "express";
import {
  createProuctController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controller/productController.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

//router obj
const router = express.Router();

//routers

//GET ALL PRODUCTs
router.get("/get-all", getAllProductsController);

//GET SINGLE PRODUCT
router.get("/:id", getSingleProductController);

//CREATE PRODUCT
router.post("/create", isAuth, isAdmin, singleUpload, createProuctController);

//UPDATE PRODUCT
router.post("/update", isAuth, isAdmin, updateProductController);

// UPDATE PRODUCT IMAGE
router.put(
  "/image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController
);

// DELETE PRODUCT
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// DELETE PRODUCT IMAGE
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);

// REVIEW PRODUCT
router.put("/:id/review",isAuth,productReviewController)

export default router;
