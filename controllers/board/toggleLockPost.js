import log from "../../config/logging.js";
import { updatePostLock } from "../../services/boardService.js";

// requires admin authorization
export default async function toggleLockPost(req, res, next) {
  try {
    log.info(`Toggling the lock status of post #${req.params.postId}`);
    const postId = await updatePostLock(req.params.postId);
    log.info(`Toggled the lock status of post #${postId}`);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
}
