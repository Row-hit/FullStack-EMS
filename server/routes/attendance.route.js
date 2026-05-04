import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  clockInOut,
  getAttendance,
} from "../controllers/attendance.controller.js";

const attendanceRouter = Router();

attendanceRouter.use(protect);

attendanceRouter.post("/", clockInOut);
attendanceRouter.get("/", getAttendance);

export default attendanceRouter;
