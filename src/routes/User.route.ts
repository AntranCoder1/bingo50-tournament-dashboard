import express from "express";
import * as userController from "../controllers/User.controller";
const router = express.Router();

router.post("/login", userController.Login);

router.post("/register", userController.Register);

export default router;
