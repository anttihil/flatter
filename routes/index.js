import { Router } from "express";
import userRouter from "./userRouter.js";
import boardRouter from "./boardRouter.js";
import { readUnauthorizedPage } from "../controllers/userController.js";

const errorRouter = Router();
errorRouter.route("/403").get(readUnauthorizedPage);

export default function mountRoutes(app) {
  app.get("/", (req, res) => res.redirect("/board/all"));
  app.use("/board", boardRouter);
  app.use("/user", userRouter);
  app.get("/about", (req, res) => res.render("about"));
  app.use("/error", errorRouter);
}
