import { Router } from "express";
import passport from "passport";
import {
  getLoginPage,
  getRegisterPage,
  getRegisterSuccess,
  getUnauthorizedPage,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const loginRouter = Router();
loginRouter
  .route("/")
  .get(getLoginPage)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/",
      failureMessage: true,
    })
  );

const logoutRouter = Router();
logoutRouter.route("/").get(logoutUser);

const registerRouter = Router();
registerRouter.route("/").get(getRegisterPage).post(registerUser);
registerRouter.route("/success").get(getRegisterSuccess);

const errorRouter = Router();
errorRouter.route("/403").get(getUnauthorizedPage);

export { loginRouter, logoutRouter, registerRouter, errorRouter };
