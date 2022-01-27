import userRouter from "./userRouter.js";
import boardRouter from "./boardRouter.js";
import imageRouter from "./imageRouter.js";

export default function mountRoutes(app) {
  app.get("/", (req, res) => {
    try {
      res.redirect("/board/all");
    } catch (error) {
      next(error);
    }
  });
  app.use("/board", boardRouter);
  app.use("/image", imageRouter);
  app.use("/user", userRouter);
  app.get("/about", (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      next(error);
    }
  });
}
