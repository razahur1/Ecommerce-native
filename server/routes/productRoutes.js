import express from "express";
import {
  createProuctController,
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

//GET SINGLE PRODUCTs
router.get("/:id", getSingleProductController);

//CREATE PRODUCTs
router.post("/create", isAuth, singleUpload, createProuctController);

//UPDATE PRODUCTs
router.post("/update", isAuth, updateProductController);

// UPDATE PRODUCT IMAGE
router.put("/image/:id", isAuth, singleUpload, updateProductImageController);

export default router;
