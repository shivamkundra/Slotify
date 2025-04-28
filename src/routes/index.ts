// After other imports
import { Router } from "express";
import authRoutes from "./auth";

const router = Router();
// After app.use(express.json())...
router.use("/api/auth", authRoutes);

export default router;
