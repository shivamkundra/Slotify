import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

// Public routes
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;
