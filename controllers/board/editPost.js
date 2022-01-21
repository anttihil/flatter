import log from "../../config/logging.js";
import { validationResult } from "express-validator";
import { updatePost } from "../../services/boardService.js";

// requires user authorization
export default async function editPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("readPost", { errors: errors.mapped() });
    }

    log.info(
      `Updating post #${req.params.postId}, title:${req.body.title}, image: ${req.body.image}, text:${req.body.text}`
    );
    const postId = await updatePost(
      req.params.postId,
      req.body.title,
      req.body.text,
      req.body.image
    );
    log.info(`Updated post #${postId}`);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
}
