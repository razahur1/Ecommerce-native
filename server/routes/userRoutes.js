import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  passwordResetController,
  registerController,
  updatePasswordController,
  updateProfileController,
  updateProfilePicController,
} from "../controller/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

//router obj
const router = express.Router();

//routes

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//profile
router.get("/profile", isAuth, getUserProfileController);

//logout
router.get("/logout", isAuth, logoutController);

//update Profile
router.put("/profile-update", isAuth, updateProfileController);

//update Password
router.put("/update-password", isAuth, updatePasswordController);

//update Picture
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

//export
export default router;
