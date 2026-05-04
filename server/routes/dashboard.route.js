import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.use(protect);

dashboardRouter.get("/", getDashboard);

export default dashboardRouter;
