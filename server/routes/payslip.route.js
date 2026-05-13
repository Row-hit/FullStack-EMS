import { Router } from "express";
import { protect, protectADMIN } from "../middleware/auth.middleware.js";
import {
  createPayslip,
  getPayslipById,
  getPayslips,
} from "../controllers/payslip.controller.js";

const payslipRouter = Router();

payslipRouter.use(protect);

payslipRouter.post("/", protectADMIN, createPayslip);
payslipRouter.get("/", getPayslips);
payslipRouter.get("/:id", getPayslipById);

export default payslipRouter;
