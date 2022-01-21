import log from "../../config/logging.js";
import { validationResult } from "express-validator";
import { updateComment } from "../../services/boardService.js";
// requires user authorization
export default async function editComment(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("readPost", { errors: errors.mapped() });
    }

    log.info(`Updating comment #${req.params.commentId}`);
    const commentId = await updateComment(req.params.commentId, req.body.text);
    log.info(`Updated comment #${commentId}`);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
}
