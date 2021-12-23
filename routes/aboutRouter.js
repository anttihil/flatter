import { Router } from "express";
import { selectBoards } from "../services/boardService.js";

const aboutRouter = Router();

aboutRouter.route("/").get(async (req, res) => {
  try {
    const boards = await selectBoards();
    res.render("about", { boards: boards });
  } catch (error) {
    next(error);
  }
});

export default aboutRouter;
