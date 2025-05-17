import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  register,
  login,
  logout,
  sendOtp,
  verifyEmail,
  isAuthenticated,
  sendPasswordResetOtp,
  resetPassword,
  addProfilePic,
  updateUserInfo,
} from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendOtp);
authRouter.post("/verify-email", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendPasswordResetOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/add-profile-pic", userAuth, addProfilePic);
authRouter.put("/update-user-info", userAuth, updateUserInfo);

export default authRouter;
