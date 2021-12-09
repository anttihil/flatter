import { Router } from "express";
import { getLoginPage, logInUser } from "../controllers/loginController.js";


const loginRouter = Router();

loginRouter.route("/").get(getLoginPage).post(logInUser);

export default loginRouter;
