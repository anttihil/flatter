import userRouter from "./userRouter";
import boardRouter from "./boardRouter";
import landingRouter from "./landingRouter";

export function mountRoutes(app) {
  app.use("/", landingRouter);
  app.use("/board", boardRouter);
  app.use("/user", userRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
}
