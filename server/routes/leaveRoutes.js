
import {Router} from "express";
import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const leaveRouter = Router();

leaveRouter.post("/" ,protect, createLeave)
leaveRouter.get("/",protect, getLeave)
leaveRouter.patch("/:id", protect, protectAdmin, updateLeaveStatus)

export default leaveRouter;