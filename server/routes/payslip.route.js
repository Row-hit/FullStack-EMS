import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";
import {
  createPayslip,
  getPayslipById,
  getPayslips,
} from "../controllers/payslip.controller.js";

const payslipRouter = Router();

payslipRouter.use(protect);

payslipRouter.post("/", protectAdmin, createPayslip);
payslipRouter.get("/", getPayslips);
payslipRouter.get("/:id", getPayslipById);

export default payslipRouter;
