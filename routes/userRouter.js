import { Router } from "express";
import { isAdmin, isOwnUser } from "../middleware/authorization.js";
import {
  getAdminDashboard,
  getUserPage,
  getUserSettings,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/admin").get(isAdmin, getAdminDashboard);
userRouter.route("/:userId").get(getUserPage);
userRouter.route("/:userId/dashboard").get(isOwnUser, getUserSettings);

export default userRouter;
