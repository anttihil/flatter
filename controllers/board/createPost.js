import log from "../../config/logging.js";
import { validationResult } from "express-validator";
import { insertPost } from "../../services/boardService.js";

export function processValidationErrorsForCreatePost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createPost", { errors: errors.mapped() });
    }
    next();
  } catch (error) {
    next(error);
  }
}

// Requires user authorization.
export default async function createPost(req, res, next) {
  try {
    log.info(
      `User #${req.user.username} is creating a post in ${req.body.board}`
    );
    const postId = await insertPost(
      req.body.board,
      req.user.id,
      req.body.title,
      req.body.text
    );
    log.info(`Created post #${postId}`);

    const imageIds = await insertImages(req.imageIds, req.user.id, postId);
    log.info(`Created images with ids: ${imageIds.join(", ")}`);

    res.status(201).redirect(`/board/post/${postId}`);
  } catch (error) {
    next(error);
  }
}
