import { Router } from "express";
import postRouter from "./postRouter";
import { getAllBoardsNew, getBoardNew } from "../controllers/boardController";
const boardRouter = Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.
boardRouter.use("/:board_name/:post_id/:post_name", postRouter);

boardRouter.route("/" || "/new").get((req, res) => {
  res.redirect("/new/1");
});

boardRouter.route("/new/:count").get(getAllBoardsNew);

boardRouter.route("/new/:board_name").get((req, res) => {
  res.redirect(`/new/${req.params.board_name}/1`);
});

boardRouter.route("/new/:board_name/:count").get(getBoardNew);

export default boardRouter;

/* boardRouter.post("/", boardController.postBoardController);

boardRouter.delete(":board_id", boardController.deleteBoardController);

boardRouter.put("/:board_id", boardController.updateBoardController);
 */
