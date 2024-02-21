import express from "express";
import {
  createProuctController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  updateProductImageController,
} from "../controller/productController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

//router obj
const router = express.Router();

//routers

//GET ALL PRODUCTs
router.get("/get-all", getAllProductsController);

//GET SINGLE PRODUCT
router.get("/:id", getSingleProductController);

//CREATE PRODUCT
router.post("/create", isAuth, singleUpload, createProuctController);

//UPDATE PRODUCT
router.post("/update", isAuth, updateProductController);

// UPDATE PRODUCT IMAGE
router.put("/image/:id", isAuth, singleUpload, updateProductImageController);

// DELETE PRODUCT
router.delete("/delete/:id", isAuth, deleteProductController );

// DELETE PRODUCT IMAGE
router.delete("/delete-image/:id", isAuth, deleteProductImageController);


export default router;
