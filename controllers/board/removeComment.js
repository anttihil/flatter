import log from "../../config/logging.js";
import { deleteComment } from "../../services/boardService.js";

// requires admin authorization
export default async function removeComment(req, res, next) {
  try {
    log.info(`Deleting comment #${req.params.commentId}`);
    const commentId = await deleteComment(req.params.commentId);
    log.info(`Deleted comment #${commentId}`);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
}
