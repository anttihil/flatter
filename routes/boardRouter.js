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

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("all/new/0");
});

// route for creating a post
boardRouter.route("/createpost").get(getCreatePost).post(submitPost);

// routes for boards
boardRouter.route("/all/new/:count(\\d+)").get(getAllBoardsNew);
boardRouter.route("/:boardName/new/:count(\\d+)").get(getBoardNew);
boardRouter.route("/:boardName/new").get((req, res) => {
  res.redirect(`/${req.params.boardName}/new/0`);
});

// routes for posts
boardRouter
  .route("/:postId(\\d+)")
  .get(getPostAndComments)
  .put(editPost)
  .post(submitComment);

// routes for altering comments
boardRouter
  .route("/:postId(\\d+)/:commentId(\\d+)")
  .delete(deleteComment)
  .put(updateComment);

export default boardRouter;
