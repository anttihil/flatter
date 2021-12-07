import { Router } from "express";

const loginRouter = Router();

loginRouter.route("/").get(getLoginPage).post(logInUser);

export default loginRouter;
