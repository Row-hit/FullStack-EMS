import { Router } from "express";
import {
  changePassword,
  login,
  session,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.use("/secure", protect);

authRouter.post("/login", login);
authRouter.get("/secure/session", session);
authRouter.post("/secure/change-password", changePassword);

export default authRouter;
