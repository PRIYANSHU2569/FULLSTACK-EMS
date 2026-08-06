import {Router} from "express";
import { changePassword, login, session } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";



const authRouter = Router();

authRouter.get("/login",login)
authRouter.post("/session", protect,session)
authRouter.put("/change-password" , protect, changePassword)

export default authRouter;