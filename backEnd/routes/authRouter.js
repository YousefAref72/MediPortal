import express from "express";
import {
  logInController,
  registerController,
  sendEmailVerificationCode,
  resstPassword,
  changePassword,
  validateLoggedIn,
  checkVerificationCode,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/forgetPassword/:email", sendEmailVerificationCode);
router.post("/checkVerificationCode/:email", checkVerificationCode);
router.post("/resetPassword/:email", resstPassword);
router.post("/logIn", logInController);
router.post("/register", registerController);
router.use(validateLoggedIn);
router.patch("/updatePassword", changePassword);
export default router;
