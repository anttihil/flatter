import { Router } from "express";

const landingRouter = Router();

landingRouter.route("/").get((req, res) => {
  res.redirect("/board");
});

export default landingRouter;
