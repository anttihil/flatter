import { Router } from "express";
import { isAdmin, isUser } from "../middleware/authorization.js";
import readAdminDashboard from "../controllers/user/readAdminDashboard.js";
import readForgotPasswordPage from "../controllers/user/readForgotPasswordPage.js";
import readUserDashboard from "../controllers/user/readUserDashboard.js";
import readLoginPage from "../controllers/user/readLoginPage.js";
import readRegisterPage from "../controllers/user/readRegisterPage.js";
import readRegisterSuccess from "../controllers/user/readRegisterSuccess.js";
import logoutUser from "../controllers/user/logoutUser.js";
import createUser from "../controllers/user/createUser.js";
import toggleUserBan from "../controllers/user/toggleUserBan.js";
import setUserTempBan from "../controllers/user/setUserTempBan.js";
import { selectEmail, selectUsername } from "../services/userService.js";
import passport from "passport";
import { body } from "express-validator";

const userRouter = Router();

function checkEmailUniqueness(email) {
  return selectEmail(value).then((arr) => {
    if (!!arr.length) {
      return Promise.reject("Email already in use");
    } else Promise.resolve();
  });
}

function checkUsernameUniqueness(username) {
  return selectUsername(value).then((arr) => {
    if (!!arr.length) {
      return Promise.reject("Username already in use");
    } else Promise.resolve();
  });
}

userRouter
  .route("/login")
  .get(readLoginPage)
  .post(
    body("email").normalizeEmail(),
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
userRouter
  .route("/register")
  .get(readRegisterPage)
  .post(
    body("email").isEmail().normalizeEmail().custom(checkEmailUniqueness),
    body("username")
      .isAlphanumeric("en-US")
      .isLength({ min: 1, max: 20 })
      .custom(checkUsernameUniqueness),
    body("password").isAlphanumeric("en-US").isLength({ min: 12, max: 100 }),
    createUser
  );
userRouter.route("/admin/dashboard").get(isAdmin, readAdminDashboard);
userRouter.route("/dashboard").get(isUser, readUserDashboard);

export default userRouter;
