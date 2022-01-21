import log from "../../config/logging.js";
import { validationResult } from "express-validator";
import { insertComment } from "../../services/boardService.js";
/* 
Requires user authorization.
Deals with both replies to posts and to other comments: if commentId param is empty,
then it is a reply to the post itself.
*/
export const createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("readPost", { errors: errors.mapped() });
    }

    const commentId = await insertComment(
      req.user.id,
      req.params.postId,
      req.body.text,
      req.params.commentId
    );
    log.info(`Created comment #${commentId}`);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
};
