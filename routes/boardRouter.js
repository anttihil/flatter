import { Router } from "express";
import {
  getPostAndComments,
  getCreatePost,
  submitPost,
  editPost,
  submitComment,
  deleteComment,
  updateComment,
  getBoard,
} from "../controllers/boardController.js";
const boardRouter = Router();

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("all");
});

// route for creating a post
boardRouter.route("/createpost").get(getCreatePost).post(submitPost);

// routes for boards
boardRouter.route("/:boardName").get(getBoard);
/* boardRouter.route("/all/:count(\\d+)").get(getAllBoardsNew);
boardRouter.route("/:boardName/:count(\\d+)").get(getBoardNew);
boardRouter.route("/:boardName").get((req, res) => {
  res.redirect(`/${req.params.boardName}/0`);
}); */

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
