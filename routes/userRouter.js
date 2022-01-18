import { Router } from "express";
import { isAdmin, isUser } from "../middleware/authorization.js";
import {
  readAdminDashboard,
  readForgotPasswordPage,
  readUserDashboard,
  readLoginPage,
  readRegisterPage,
  readRegisterSuccess,
  logoutUser,
  createUser,
  toggleUserBan,
  setUserTempBan,
} from "../controllers/userController.js";
import passport from "passport";

const userRouter = Router();

userRouter
  .route("/login")
  .get(readLoginPage)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      successRedirect: "/",
      failureMessage: true,
    })
  );

userRouter.route("/:userId(\\d+)/ban").post(isAdmin, toggleUserBan);
userRouter.route("/:userId(\\d+)/tempban").post(isAdmin, setUserTempBan);
userRouter.route("/forgotPassword").get(readForgotPasswordPage);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/register/success").get(readRegisterSuccess);
userRouter.route("/register").get(readRegisterPage).post(createUser);
userRouter.route("/admin/dashboard").get(isAdmin, readAdminDashboard);
userRouter.route("/dashboard").get(isUser, readUserDashboard);

export default userRouter;
