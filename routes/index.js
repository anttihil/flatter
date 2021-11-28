import { userRouter } from "./userRouter";
import { boardRouter } from "./boardRouter";
import { commentsRouter } from "./commentsRouter";

export function mountRoutes(app) {
  app.use("/", landingRouter);
  app.use("/board/:category_name/:post_id/:post_name", postsRouter);
  app.use("/user", userRouter);
  app.use("/board/:category_name", boardRouter);
  app.use("/comments", commentsRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
}
