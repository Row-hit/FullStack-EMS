import { Router } from "express";
import { changePassword, login, session } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.use("/secure", protect);

authRouter.post("/login", login);
authRouter.get("/secure/session", session);
authRouter.post("/secure/change-password", changePassword);

export default authRouter;
