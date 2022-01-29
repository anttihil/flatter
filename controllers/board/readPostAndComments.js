import createHttpError from "http-errors";
import log from "../../config/logging.js";
import { selectPostandComments } from "../../services/boardService.js";

export default async function readPostAndComments(req, res, next) {
  try {
    log.info(`Selecting post and comments with postId ${req.params.postId}`);
    const result = await selectPostandComments(req.params.postId);
    log.info(`Selecting post and comments with postId ${req.params.postId}`);
    if (!result?.post) {
      next(createHttpError(404, "The post was not found."));
    } else {
      res.status(200).render("readPost", {
        post: result.post,
        images: result.images,
        comments: result.comments,
        csrfToken: req.csrfToken(),
      });
    }
  } catch (error) {
    next(error);
  }
}
