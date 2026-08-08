import {Router} from "express";
import { createPayslip, getPayslipById, getPayslips } from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin,createPayslip)
payslipRouter.post("/", protect, getPayslips)
payslipRouter.post("/", protect, getPayslipById)

export default payslipRouter