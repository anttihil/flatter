import createHttpError from "http-errors";
import log from "../config/logging.js";
import {
  selectCommentOwner,
  selectPostOwner,
} from "../services/boardService.js";

export function isAdmin(req, res, next) {
  if (req.user) {
    if (req.user.role === "admin") {
      next();
    } else {
      next(
        createHttpError(403, "You are not authorized to use this resource.")
      );
    }
  } else {
    next(createHttpError(401, "You must login to use this resource."));
  }
}

export function isOwnUser(req, res, next) {
  if (req.user) {
    if (req.user.id === req.body.userId) {
      next();
    } else {
      next(
        createHttpError(403, "You are not authorized to use this resource.")
      );
    }
  } else {
    next(createHttpError(401, "You must login to use this resource."));
  }
}

/* 
First check: the user has an authenticated session
  Then queries db for req.params.commentId
  Second check: comment owner Id is the same as the user 
*/
export async function isCommentOwner(req, res, next) {
  try {
    if (req.user) {
      log.info(
        `Authorization: Querying for owner of comment #${req.params.commentId}`
      );
      const owner = await selectCommentOwner(req.params.commentId);
      log.info(`Authorization: Found owner #${owner} of comment`);
      if (owner === req.user.id) {
        next();
      } else {
        next(
          createHttpError(403, "You are not authorized to use this resource.")
        );
      }
    } else {
      next(createHttpError(401, "You must login to use this resource."));
    }
  } catch (error) {
    next(error);
  }
}

export async function isPostOwner(req, res, next) {
  try {
    if (req.user) {
      const owner = await selectPostOwner(req.params.postId);
      if (owner.id === req.user.id) {
        next();
      } else {
        next(
          createHttpError(403, "You are not authorized to use this resource.")
        );
      }
    } else {
      next(createHttpError(401, "You must login to use this resource."));
    }
  } catch (error) {
    next(error);
  }
}
export const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createHttpError(401, "You must login to use this resource."));
  }
};
