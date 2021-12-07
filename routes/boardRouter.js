import { Router } from "express";
import {
  getAllBoardsNew,
  getBoardNew,
  getPostAndComments,
} from "../controllers/boardController.js";
const boardRouter = Router();

boardRouter.route("/").get((req, res) => {
  res.redirect("all/new/0");
});

boardRouter.route("/all/new/:count").get(getAllBoardsNew);
boardRouter.route("/:board_name/new/:count").get(getBoardNew);
boardRouter.route("/:board_name/new").get((req, res) => {
  res.redirect(`/${req.params.board_name}/new/0`);
});

boardRouter.route("/:board_name/create").get(createPost)
boardRouter.route("/:board_name/create").post(submittedPost)

boardRouter.route("/:board_name/:post_id/:post_name").get(getPostAndComments);
boardRouter.route("/:board_name/:post_id/:post_name").put(editPost);
boardRouter.route("/:board_name/:post_id/:post_name").post(createComment);

boardRouter.route("/:board_name/:post_id/:post_name/:comment_id").delete(deleteComment);
boardRouter.route("/:board_name/:post_id/:post_name/:comment_id").put(updateComment);

export default boardRouter;
