import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const profileRouter = Router();

profileRouter.use(protect);

profileRouter.get("/", getProfile);
profileRouter.post("/", updateProfile);

export default profileRouter;
