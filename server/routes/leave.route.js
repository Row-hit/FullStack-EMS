import { Router } from "express";
import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";

const leaveRouter = Router();

leaveRouter.use(protect);

leaveRouter.post("/", createLeave);
leaveRouter.get("/", getLeaves);
leaveRouter.patch("/:id", protectAdmin, updateLeaveStatus);

export default leaveRouter;
