import { Router } from "express";
import {
  readPostAndComments,
  readCreatePost,
  createPost,
  editPost,
  removePost,
  createComment,
  removeComment,
  editComment,
  readBoard,
} from "../controllers/boardController.js";

const boardRouter = Router();

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("/board/all");
});

boardRouter.route("/post/create").get(readCreatePost).post(createPost);

boardRouter.route("/post/:postId(\\d+)").get(readPostAndComments);

boardRouter.route("/post/:postId(\\d+)/edit").post(editPost);

boardRouter.route("/post/:postId(\\d+)/remove").post(removePost);

boardRouter.route("/post/:postId(\\d+)/comment/create").post(createComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/edit")
  .post(editComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/remove")
  .post(removeComment);

boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/create")
  .post(createComment);

boardRouter.route("/:boardName").get(readBoard);

export default boardRouter;
