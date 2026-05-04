import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller";
import { protect, protectAdmin } from "../middleware/auth.middleware";

const employeeRouter = Router();

employeeRouter.use(protect, protectAdmin);

employeeRouter.get("/", getEmployees);
employeeRouter.post("/", createEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
