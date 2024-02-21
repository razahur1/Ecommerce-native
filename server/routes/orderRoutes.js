import express from "express";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
  getMyOrdersController,
  paymentsController,
  singleOrderDetailsController,
} from "../controller/orderController.js";

const router = express.Router();

//routes

// CREATE ORDER
router.post("/create", isAuth, createOrderController);

// GET ALL ORDERS
router.get("/my-orders", isAuth, getMyOrdersController);

// GET SINGLE ORDER DETAILS
router.get("/my-orders/:id", isAuth, singleOrderDetailsController);

// Accept Payments
router.post("/payments", isAuth, paymentsController);

// =========== ADMIN PART =============

// get all order
router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

//change order status
router.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);

export default router;
