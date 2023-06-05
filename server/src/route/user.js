import express from "express";
import { allUsers, login, register } from "../controller/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get_users", allUsers);

router.get("/check", (req, res) => {
  res.send("check");
});

export default router;
