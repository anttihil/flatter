import { Router } from "express";
import createComment from "../controllers/board/createComment.js";
import createPost, {
  processValidationErrorsForCreatePost,
} from "../controllers/board/createPost.js";
import editComment from "../controllers/board/editComment.js";
import editPost from "../controllers/board/editPost.js";
import readBoard from "../controllers/board/readBoard.js";
import readCreatePost from "../controllers/board/readCreatePost.js";
import readPostAndComments from "../controllers/board/readPostAndComments.js";
import removeComment from "../controllers/board/removeComment.js";
import removePost from "../controllers/board/removePost.js";
import toggleLockPost from "../controllers/board/toggleLockPost.js";
import {
  isUser,
  isAdmin,
  isCommentOwner,
  isPostOwner,
  isNotBanned,
} from "../middleware/authorization.js";
import { body } from "express-validator";
import uploadPostForm from "../middleware/uploadPostForm.js";
import checkFileType from "../middleware/checkFileType.js";
import resizeImages from "../middleware/resizeImages.js";
import uploadToSpaces from "../middleware/uploadToSpaces.js";
import csrfProtection from "../middleware/csurf.js";

const boardRouter = Router();

// default route for board
boardRouter.route("/").get((req, res) => {
  res.redirect("/board/all");
});
boardRouter
  .route("/post/create")
  .get(csrfProtection, readCreatePost)
  .post(
    isUser,
    isNotBanned,
    uploadPostForm,
    csrfProtection,
    body("title").isLength({ max: 150 }),
    body("board").custom((value, { req }) => {
      if (!req.app.locals.boards.includes(value)) {
        throw new Error("The board you selected does not exist.");
      }
      return true;
    }),
    body("text").isLength({ max: 60000 }),
    processValidationErrorsForCreatePost,
    checkFileType,
    resizeImages,
    uploadToSpaces,
    createPost
  );
boardRouter
  .route("/post/:postId(\\d+)")
  .get(csrfProtection, readPostAndComments);
boardRouter
  .route("/post/:postId(\\d+)/edit")
  .post(
    isPostOwner,
    isNotBanned,
    csrfProtection,
    body("title").isLength({ max: 150 }).escape(),
    body("image_url").isURL(),
    body("text").isLength({ max: 60000 }).escape(),
    editPost
  );
boardRouter
  .route("/post/:postId(\\d+)/remove")
  .post(isAdmin, csrfProtection, removePost);
boardRouter
  .route("/post/:postId(\\d+)/lock")
  .post(isAdmin, csrfProtection, toggleLockPost);
boardRouter
  .route("/post/:postId(\\d+)/comment/create")
  .post(
    isUser,
    isNotBanned,
    csrfProtection,
    body("text").isLength({ max: 60000 }).escape(),
    createComment
  );
boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/edit")
  .post(
    isCommentOwner,
    isNotBanned,
    csrfProtection,
    body("text").isLength({ max: 60000 }).escape(),
    editComment
  );
boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/remove")
  .post(isAdmin, csrfProtection, removeComment);
boardRouter
  .route("/post/:postId(\\d+)/comment/:commentId(\\d+)/create")
  .post(
    isUser,
    isNotBanned,
    csrfProtection,
    body("text").isLength({ max: 60000 }).escape(),
    createComment
  );
boardRouter.route("/:boardName").get(readBoard);

export default boardRouter;
