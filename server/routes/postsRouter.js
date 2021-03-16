const express = require("express");
const postsController = require("../controllers/postsController");

const postsRouter = express.Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

postsRouter.get("/n/:count", postsController.getNewestPostsController);

postsRouter.get("/s/:count", postsController.getStarredPostsController);

postsRouter.get("/:id", postsController.getPostController);

postsRouter.delete("/:id", postsController.deletePostController);

postsRouter.post("/:id", postsController.postPostController);

postsRouter.update("/:id", postsController.updatePostController);

postsRouter.update("/s/:id", postsController.upvotePostController);

module.exports = postsRouter;
