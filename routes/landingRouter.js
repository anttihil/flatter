import { Router } from "express";

const landingRouter = Router();

landingRouter.route("/").get((req, res) => {
  res.redirect("/board/all/new/0");
});

export default landingRouter;
