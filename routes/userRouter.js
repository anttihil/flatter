import { Router } from "express";
import {
  isAdmin,
  isNotBanned,
  isVerifiedUser,
} from "../middleware/authorization.js";
import editUserPassword from "../controllers/user/password/editUserPassword.js";
import editUsername from "../controllers/user/editUsername.js";
import readAdminDashboard from "../controllers/user/admin/readAdminDashboard.js";
import readForgotPasswordPage from "../controllers/user/password/readForgotPasswordPage.js";
import readUserDashboard from "../controllers/user/readUserDashboard.js";
import readLoginPage from "../controllers/user/readLoginPage.js";
import readPasswordResetForm from "../controllers/user/password/readPasswordResetForm.js";
import resetPassword from "../controllers/user/password/resetPassword.js";
import readRegisterPage from "../controllers/user/readRegisterPage.js";
import readRegisterSuccess from "../controllers/user/readRegisterSuccess.js";
import logoutUser from "../controllers/user/logoutUser.js";
import createUser from "../controllers/user/createUser.js";
import toggleUserBan from "../controllers/user/admin/toggleUserBan.js";
import setUserTempBan from "../controllers/user/admin/setUserTempBan.js";
import verifyEmail from "../controllers/user/email/verifyEmail.js";
import sendPasswordResetEmail from "../controllers/user/password/sendPasswordResetEmail.js";
import sendVerificationEmail from "../controllers/user/email/sendVerificationEmail.js";
import { selectEmail, selectUsername } from "../services/userService.js";
import passport from "passport";
import { body, query } from "express-validator";
import csrfProtection from "../middleware/csurf.js";
import {
  createAccountLimiter,
  resetPasswordLimiter,
} from "../middleware/rateLimiters.js";

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

userRouter.route("/admin/ban").post(isAdmin, csrfProtection, toggleUserBan);
userRouter
  .route("/admin/dashboard")
  .get(isAdmin, csrfProtection, readAdminDashboard);
userRouter
  .route("/admin/tempBan")
  .post(isAdmin, csrfProtection, setUserTempBan);
userRouter
  .route("/dashboard")
  .get(isVerifiedUser, isNotBanned, csrfProtection, readUserDashboard);
userRouter
  .route("/email/verify")
  .post(csrfProtection, sendVerificationEmail)
  .get(query("token").isJWT(), verifyEmail);
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
userRouter.route("/logout").get(logoutUser);
userRouter
  .route("/password/change")
  .post(
    isVerifiedUser,
    isNotBanned,
    csrfProtection,
    body("newPassword").isAlphanumeric("en-US").isLength({ min: 12, max: 100 }),
    editUserPassword
  );
userRouter
  .route("/password/forgot")
  .post(resetPasswordLimiter, sendPasswordResetEmail)
  .get(readForgotPasswordPage);
userRouter
  .route("/password/reset")
  .post(
    body("newPassword").isAlphanumeric("en-US").isLength({ min: 12, max: 100 }),
    body("confirmPassword")
      .isAlphanumeric("en-US")
      .isLength({ min: 12, max: 100 })
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Password confirmation does not match password");
        }
        // validator successful
        return true;
      }),
    resetPassword
  )
  .get(query("token").isJWT(), readPasswordResetForm);
userRouter.route("/register/success").get(readRegisterSuccess);
userRouter
  .route("/register")
  .get(readRegisterPage)
  .post(
    createAccountLimiter,
    body("email").isEmail().normalizeEmail().custom(checkEmailUniqueness),
    body("username")
      .isAlphanumeric("en-US")
      .isLength({ min: 1, max: 20 })
      .custom(checkUsernameUniqueness),
    body("password").isAlphanumeric("en-US").isLength({ min: 12, max: 100 }),
    createUser
  );
userRouter
  .route("/username/change")
  .post(
    isVerifiedUser,
    isNotBanned,
    csrfProtection,
    body("username")
      .isAlphanumeric("en-US")
      .isLength({ min: 1, max: 20 })
      .custom(checkUsernameUniqueness),
    editUsername
  );
export default userRouter;
