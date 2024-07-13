import express from "express";
import { getUsersForSidebars } from "../controllers/user.controller.js";
import { protect } from "../middlewares/protectRoute.js";
const router = express.Router();

router.get("/", protect, getUsersForSidebars);
export default router;
