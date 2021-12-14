import { Router } from "express";
import {
  getAllBoardsNew,
  getBoardNew,
  getPostAndComments,
  getCreatePost,
  submitPost,
  editPost,
  submitComment,
  deleteComment,
  updateComment,
} from "../controllers/boardController.js";
const boardRouter = Router();

boardRouter.route("/").get((req, res) => {
  res.redirect("all/new/0");
});

boardRouter.route("/createpost").get(getCreatePost).post(submitPost);

boardRouter.route("/all/new/:count(\\d+)").get(getAllBoardsNew);
boardRouter.route("/:board_name/new/:count(\\d+)").get(getBoardNew);
boardRouter.route("/:board_name/new").get((req, res) => {
  res.redirect(`/${req.params.board_name}/new/0`);
});

boardRouter
  .route("/:board_name/:post_id(\\d+)/:post_name")
  .get(getPostAndComments)
  .put(editPost)
  .post(submitComment);
boardRouter
  .route("/:board_name/:post_id(\\d+)/:post_name/:comment_id(\\d+)")
  .delete(deleteComment);
boardRouter
  .route("/:board_name/:post_id(\\d+)/:post_name/:comment_id(\\d+)")
  .put(updateComment);

export default boardRouter;
