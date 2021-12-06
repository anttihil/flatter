import userRouter from "./userRouter.js";
import boardRouter from "./boardRouter.js";
import landingRouter from "./landingRouter.js";

export default function mountRoutes(app) {
  app.use("/", landingRouter);
  app.use("/board", boardRouter);
  app.use("/user", userRouter);
}
