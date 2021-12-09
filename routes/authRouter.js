import { Router } from "express";
import { getLoginPage, getRegisterPage, logInUser, registerUser } from "../controllers/authController.js";


const loginRouter = Router();

loginRouter.route("/").get(getLoginPage).post(logInUser);

const registerRouter = Router();
registerRouter.route("/").get(getRegisterPage).post(registerUser);

export {loginRouter, registerRouter};
