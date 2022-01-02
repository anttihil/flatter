import { Router } from "express";
import {
  getPostAndComments,
  getCreatePost,
  submitPost,
  editPost,
  deletePost,
  submitComment,
  deleteComment,
  editComment,
  getBoard,
} from "../controllers/boardController.js";
const boardRouter = Router();

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("all");
});

boardRouter.route("/post/create").get(getCreatePost).post(submitPost);

boardRouter.route("/post/:postId(\\d+)").get(getPostAndComments);

boardRouter.route("/post/:postId(\\d+)/edit").post(editPost);

boardRouter.route("/post/:postId(\\d+)/delete").post(deletePost);

boardRouter.route("/post/:postId(\\d+)/comment/create").post(submitComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/edit")
  .post(editComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/delete")
  .post(deleteComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/create")
  .post(submitComment);

boardRouter.route("/:boardName").get(getBoard);

export default boardRouter;
