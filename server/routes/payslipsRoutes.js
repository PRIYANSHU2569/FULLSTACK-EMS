import { Router } from "express";
import {
  createPayslip,
  getPayslipById,
  getPayslips,
} from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const payslipRouter = Router();

// Create payslip
payslipRouter.post("/", protect, protectAdmin, createPayslip);

// Get all payslips
payslipRouter.get("/", protect, getPayslips);

// Get single payslip
payslipRouter.get("/:id", protect, getPayslipById);

export default payslipRouter;