import { Router } from "express";
import { isAdmin, isOwnUser } from "../middleware/authorization.js";
import {
  getAdminDashboard,
  getUserPage,
  getUserSettings,
  getLoginPage,
  getRegisterPage,
  getRegisterSuccess,
  getUnauthorizedPage,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import passport from "passport";

const userRouter = Router();

userRouter
  .route("/login")
  .get(getLoginPage)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/",
      failureMessage: true,
    })
  );
userRouter.route("/logout").get(logoutUser);
userRouter.route("/register").get(getRegisterPage).post(registerUser);
userRouter.route("/success").get(getRegisterSuccess);
userRouter.route("/admin").get(isAdmin, getAdminDashboard);
userRouter.route("/:userId").get(getUserPage);
userRouter.route("/:userId/dashboard").get(isOwnUser, getUserSettings);

export default userRouter;
