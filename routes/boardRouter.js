import { Router } from "express";
import {
  readPostAndComments,
  readCreatePost,
  createPost,
  editPost,
  removePost,
  toggleLockPost,
  createComment,
  removeComment,
  editComment,
  readBoard,
} from "../controllers/boardController.js";
import {
  isUser,
  isAdmin,
  isCommentOwner,
  isPostOwner,
} from "../middleware/authorization.js";

const boardRouter = Router();

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("/board/all");
});

boardRouter.route("/post/create").get(readCreatePost).post(isUser, createPost);

boardRouter.route("/post/:postId(\\d+)").get(readPostAndComments);

boardRouter.route("/post/:postId(\\d+)/edit").post(isPostOwner, editPost);

boardRouter.route("/post/:postId(\\d+)/remove").post(isAdmin, removePost);

boardRouter.route("/post/:postId(\\d+)/lock").post(isAdmin, toggleLockPost);

boardRouter
  .route("/post/:postId(\\d+)/comment/create")
  .post(isUser, createComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/edit")
  .post(isCommentOwner, editComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/remove")
  .post(isAdmin, removeComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/create")
  .post(isUser, createComment);

boardRouter.route("/:boardName").get(readBoard);

export default boardRouter;
