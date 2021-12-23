import userRouter from "./userRouter.js";
import boardRouter from "./boardRouter.js";
import landingRouter from "./landingRouter.js";
import { loginRouter, registerRouter } from "./authRouter.js";
import aboutRouter from "./aboutRouter.js";
import { userAuthenticationLocals } from "../middleware/authentication.js";

export default function mountRoutes(app) {
  app.use("/", landingRouter);
  app.use("/board", userAuthenticationLocals, boardRouter);
  app.use("/user", userRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/about", aboutRouter);
}
