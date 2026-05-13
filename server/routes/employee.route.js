import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
  verifyEmployee,
} from "../controllers/employee.controller.js";
import { protect, protectADMIN } from "../middleware/auth.middleware.js";

const employeeRouter = Router();

employeeRouter.get("/verify-email/:token", verifyEmployee);

employeeRouter.use(protect, protectADMIN);

employeeRouter.get("/", getEmployees);
employeeRouter.post("/", createEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
