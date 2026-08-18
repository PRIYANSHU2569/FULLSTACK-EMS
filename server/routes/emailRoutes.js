import { Router } from "express";
import { sendTestEmail } from "../controllers/emailController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const emailRouter = Router();

emailRouter.post("/test", protect, protectAdmin, sendTestEmail);

export default emailRouter;
