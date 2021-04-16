const express = require("express");
const postsController = require("../controllers/postsController");

const postsRouter = express.Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

postsRouter.get(
  "/:category_id/n/:count",
  postsController.getNewestPostsController
);

postsRouter.get(
  "/:category_id/s/:count",
  postsController.getStarredPostsController
);

postsRouter.get("/:id", postsController.getPostController);

postsRouter.delete("/:id", postsController.deletePostController);

postsRouter.post("/:id", postsController.postPostController);

postsRouter.put("/:id", postsController.updatePostController);

postsRouter.put("/s/:id", postsController.upvotePostController);

module.exports = postsRouter;
