
import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { clockInOut, getAttendance } from "../controllers/attendanceController.js";

const atttendanceRouter = Router();

atttendanceRouter.post('/', protect , clockInOut)
atttendanceRouter.post('/', protect , getAttendance)

export default atttendanceRouter
