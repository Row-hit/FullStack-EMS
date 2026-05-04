import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import multer from "multer";
import connectDB from "./configDB/connectDB.js";
import authRouter from "./routes/auth.route.js";
import employeeRouter from "./routes/employee.route.js";
import profileRouter from "./routes/profile.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import leaveRouter from "./routes/leave.route.js";
import payslipRouter from "./routes/payslip.route.js";

const app = express();

const PORT = process.env.PORT || 3999;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to The EMS Server" });
});

app.use("/api/auth", authRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/payslips", payslipRouter);

await connectDB();
app.listen(PORT, () => {
  console.log(`server is running on the http://localhost:${PORT}`);
});
