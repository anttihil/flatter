import log from "../../config/logging.js";
import { deletePost } from "../../services/boardService.js";

// requires admin authorization
export default async function removePost(req, res, next) {
  try {
    log.info(`Deleting post #${req.params.postId}`);
    const postId = await deletePost(req.params.postId);
    log.info(`Deleted post #${postId}`);
    res.status(200).redirect("/");
  } catch (error) {
    next(error);
  }
}
