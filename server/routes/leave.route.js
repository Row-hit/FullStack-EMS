import { Router } from "express";
import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const leaveRouter = Router();

leaveRouter.use(protect);

leaveRouter.post("/", createLeave);
leaveRouter.get("/", getLeaves);
leaveRouter.patch("/:id", updateLeaveStatus);

export default leaveRouter;
