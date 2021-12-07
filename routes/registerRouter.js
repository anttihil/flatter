import { Router } from "express";

const registerRouter = Router();

registerRouter.route("/").get(getRegisterPage).post(registerUser);

export default registerRouter;
