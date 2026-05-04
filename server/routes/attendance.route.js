import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  clockInOut,
  getAttendance,
} from "../controllers/attendance.controller";

const attendanceRouter = Router();

attendanceRouter.use(protect);

attendanceRouter.post("/", clockInOut);
attendanceRouter.get("/", getAttendance);

export default attendanceRouter;
