import express from "express";
import {registerController, loginController, testController} from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test",requireSignin,isAdmin, testController);

export default router;
