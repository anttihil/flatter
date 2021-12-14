import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
  getLoginSuccess,
  getLoginFailure,
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

export { loginRouter, registerRouter };
