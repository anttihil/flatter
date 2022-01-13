import userRouter from "./userRouter.js";
import boardRouter from "./boardRouter.js";

export default function mountRoutes(app) {
  app.get("/", (req, res) => res.redirect("/board/all"));
  app.use("/board", boardRouter);
  app.use("/user", userRouter);
  app.get("/about", (req, res) => res.render("about"));
}
