import createHttpError from "http-errors";
import log from "../config/logging.js";
import {
  selectPostandComments,
  insertPost,
  selectPosts,
  updatePost,
  updatePostLock,
  deletePost,
  insertComment,
  updateComment,
  deleteComment,
} from "../services/boardService.js";
import { validationResult } from "express-validator";

/* 
Controller naming conventions:
Creating a resource: CreateX
Reading a resource: ReadY
Updating a resource: EditZ
Deleting a resource: RemoveW

Exception: If there is a more descriptive verb,
such as login or logout, which is not listed above
then use that verb instead.

The purpose is to be consistent and prevent conflicts
with names of service functions.
*/

// requires authorization
// deal with both replies to posts and to other comments
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

// requires authorization
export const createPost = async (req, res, next) => {
  // First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, insert post into the database
  // Then redirect to the landing page
  // remember to change the landing page to include a success modal with hidden class switch
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createPost", { errors: errors.mapped() });
    }

    log.info(
      `User #${req.user.username} is creating a post in ${req.body.board}`
    );
    const postId = await insertPost(
      req.body.board,
      req.user.id,
      req.body.title,
      req.body.text,
      req.body.image
    );
    log.info(`Created post #${postId}`);
    res.status(201).redirect(`/board/post/${postId}`);
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editComment = async (req, res, next) => {
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
};

// requires authorization
export const editPost = async (req, res, next) => {
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
};

export async function readBoard(req, res, next) {
  /*
	there should be ONE selectPosts function that accepts
	ALL the possible params and query strings as arguments
	That way we don't have write a tree of conditions
	with their own query functions. 

	Input validation
	cases to deal with: 
	allowed values of req.param.boardName: all + app.locals.boards
	allowed fields of req.query: sort, count
		allowed values sort: new
		allowed values count: non-negative integer
	*/
  try {
    let boardList = [];
    if (req.params.boardName === "all") {
      boardList = req.app.locals.boards;
    } else {
      boardList.push(req.params.boardName);
    }

    let page = req.query.page ?? 0;
    let sort = req.query.sort ?? "new";
    log.info(
      `Selecting posts from ${boardList.join(
        ", "
      )}, page: ${page}, sort: ${sort}`
    );
    const posts = await selectPosts(boardList, page, sort);
    res.status(200).render("index", { posts: posts });
  } catch (error) {
    next(error);
  }
}

// requires authorization
export const readCreatePost = (req, res, next) => {
  //First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, render the create post page
  try {
    log.info("Reading create post page.");
    res.status(200).render("createPost");
  } catch (error) {
    next(error);
  }
};

export const readPostAndComments = async (req, res, next) => {
  try {
    log.info(`Selecting post and comments with postId ${req.params.postId}`);
    const result = await selectPostandComments(req.params.postId);
    // If result.post is null, render not found page.
    res.status(200).render("readPost", {
      post: result.post,
      comments: result.comments,
    });
  } catch (error) {
    next(error);
  }
};

// requires admin? authorization
export const removeComment = async (req, res, next) => {
  try {
    log.info(`Deleting comment #${req.params.commentId}`);
    const commentId = await deleteComment(req.params.commentId);
    log.info(`Deleted comment #${commentId}`);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const removePost = async (req, res, next) => {
  try {
    log.info(`Deleting post #${req.params.postId}`);
    const postId = await deletePost(req.params.postId);
    log.info(`Deleted post #${postId}`);
    res.status(200).redirect("/");
  } catch (error) {
    next(error);
  }
};

export async function toggleLockPost(req, res, next) {
  // requires admin? authorization
  try {
    log.info(`Toggling the lock status of post #${req.params.postId}`);
    const postId = await updatePostLock(req.params.postId);
    log.info(`Toggled the lock status of post #${postId}`);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
}
