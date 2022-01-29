import { Router } from "express";
import { isAdmin, isNotBanned, isUser } from "../middleware/authorization.js";
import editUserPassword from "../controllers/user/editUserPassword.js";
import editUsername from "../controllers/user/editUsername.js";
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
import csrfProtection from "../middleware/csurf.js";

const userRouter = Router();

async function checkEmailUniqueness(email) {
  return await selectEmail(email).then((arr) => {
    if (!!arr.length) {
      return Promise.reject("Email already in use");
    } else Promise.resolve();
  });
}

async function checkUsernameUniqueness(username) {
  return await selectUsername(username).then((arr) => {
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

userRouter
  .route("/:userId(\\d+)/ban")
  .post(isAdmin, csrfProtection, toggleUserBan);
userRouter
  .route("/changePassword")
  .post(
    isUser,
    isNotBanned,
    csrfProtection,
    body("newPassword").isAlphanumeric("en-US").isLength({ min: 12, max: 100 }),
    editUserPassword
  );
userRouter
  .route("/changeUsername")
  .post(
    isUser,
    isNotBanned,
    csrfProtection,
    body("username")
      .isAlphanumeric("en-US")
      .isLength({ min: 1, max: 20 })
      .custom(checkUsernameUniqueness),
    editUsername
  );
userRouter
  .route("/:userId(\\d+)/tempBan")
  .post(isAdmin, csrfProtection, setUserTempBan);
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
userRouter
  .route("/admin/dashboard")
  .get(isAdmin, csrfProtection, readAdminDashboard);
userRouter
  .route("/dashboard")
  .get(isUser, isNotBanned, csrfProtection, readUserDashboard);

export default userRouter;
