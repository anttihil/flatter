import { Router } from "express";
import { getPost } from "../controllers/postController";

const postRouter = Router({ mergeParams: true });

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

postRouter.route("/").get(getPost);

export default postRouter;

/* postRouter.route("/:board_name").get(getNewestPostsController);
 */
/* postRouter.get(
  "/:category_id/starred/:count",
  postController.getStarredPostsController
);

postRouter.get("/:id", postController.getPostController);

postRouter.delete("/:id", postController.deletePostController);

postRouter.post("/:id", postController.postPostController);

postRouter.put("/:id", postController.updatePostController);

postRouter.put("/s/:id", postController.upvotePostController);
 */
