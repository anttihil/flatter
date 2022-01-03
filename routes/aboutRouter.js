import { Router } from "express";

const aboutRouter = Router();

aboutRouter.route("/").get((req, res) => {
  try {
    res.render("about");
  } catch (error) {
    next(error);
  }
});

export default aboutRouter;
