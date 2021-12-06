const express = require("express");
const commentsController = require("../controllers/commentController.js");

const commentsRouter = express.Router({ mergeParams: true });

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

commentsRouter.get(
  "/:post_id/n/:count",
  commentsController.getNewestCommentsController
);

commentsRouter.get(
  "/:post_id/s/:count",
  commentsController.getStarredCommentsController
);

commentsRouter.get("/:comment_id", commentsController.getCommentController);

commentsRouter.delete(
  "/:comment_id",
  commentsController.deleteCommentController
);

commentsRouter.post("/", commentsController.postCommentController);

commentsRouter.put("/:comment_id", commentsController.updateCommentController);

commentsRouter.put(
  "/s/:comment_id",
  commentsController.upvoteCommentController
);

module.exports = commentsRouter;
