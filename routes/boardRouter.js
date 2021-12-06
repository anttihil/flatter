import { Router } from "express";

import {
  getAllBoardsNew,
  getBoardNew,
} from "../controllers/boardController.js";
import { getPostController } from "../controllers/postController.js";
const boardRouter = Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.
//boardRouter.use("/new/:board_name/:post_id/:post_name", postRouter);

boardRouter.route("/").get((req, res) => {
  res.redirect("/board/all/new/0");
});

boardRouter.route("/all/new/:count").get(getAllBoardsNew);

boardRouter.route("/:board_name/new").get((req, res) => {
  res.redirect(`/${req.params.board_name}/new/0`);
});

boardRouter.route("/:board_name/new/:count").get(getBoardNew);

boardRouter.route("/:board_name/:post_id/:post_name").get(getPostController);

export default boardRouter;

/* boardRouter.post("/", boardController.postBoardController);

boardRouter.delete(":board_id", boardController.deleteBoardController);

boardRouter.put("/:board_id", boardController.updateBoardController);
 */
