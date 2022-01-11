import { Router } from "express";
import { isAdmin, isOwnUser } from "../middleware/authorization.js";
import {
  readAdminDashboard,
  readUserPage,
  readUserSettings,
  readLoginPage,
  readRegisterPage,
  readRegisterSuccess,
  logoutUser,
  createUser,
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
userRouter.route("/logout").get(logoutUser);
userRouter.route("/register").get(readRegisterPage).post(createUser);
userRouter.route("/success").get(readRegisterSuccess);
userRouter.route("/admin/dashboard").get(isAdmin, readAdminDashboard);
userRouter.route("/dashboard").get(readUserPage);
userRouter.route("/:userId").get(readUserPage);
userRouter.route("/:userId/settings").get(isOwnUser, readUserSettings);

export default userRouter;
