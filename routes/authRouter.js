import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
  getRegisterSuccess,
  getLoginSuccess,
  getLoginFailure,
  getUnauthorizedPage,
  registerUser,
} from "../controllers/authController.js";

const loginRouter = Router();
loginRouter
  .route("/")
  .get(getLoginPage)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/failure",
      successRedirect: "/success",
    })
  );

loginRouter.route("/success").get(getLoginSuccess);
loginRouter.route("/failure").get(getLoginFailure);

const registerRouter = Router();
registerRouter.route("/").get(getRegisterPage).post(registerUser);
registerRouter.route("/success").get(getRegisterSuccess);

const errorRouter = Router();
errorRouter.route("/403").get(getUnauthorizedPage);

export { loginRouter, registerRouter };
