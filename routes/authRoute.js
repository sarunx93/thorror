import express from "express";
import {
  register,
  updateUser,
  loginUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
export default router;
