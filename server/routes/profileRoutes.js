import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/", protect, getProfile);
profileRouter.get("/", protect, updateProfile);

export default profileRouter;
