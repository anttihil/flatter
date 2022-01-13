import createHttpError from "http-errors";
import {
  selectPostandComments,
  insertPost,
  selectPosts,
  updatePost,
  deletePost,
  insertComment,
  updateComment,
  deleteComment,
} from "../services/boardService.js";

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
    /* let commentId;
    if (!req.params.commentId) commentId = "NULL";
    else commentId = req.params.commentId; */
    const result = await insertComment(
      req.user.id,
      req.params.postId,
      req.body.text,
      req.params.commentId
    );
    if (result) {
      console.log(result.id);
    }
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
    console.log(
      `User #${req.user.username} is creating a post in ${req.body.board}`
    );
    const result = await insertPost(
      req.body.board,
      req.user.id,
      req.body.title,
      req.body.text,
      req.body.image
    );
    if (result) {
      console.log(`Created post #${result.id}`);
    }
    res.status(201).redirect(`/board/post/${result.id}`);
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editComment = async (req, res, next) => {
  try {
    console.log(`Updating comment #${req.body.commentId}`);
    const result = await updateComment(req.params.commentId, req.body.text);
    if (result) {
      console.log(`Updated comment #${req.body.commentId} successfully`);
    }
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editPost = async (req, res, next) => {
  try {
    console.log(
      `Updating post #${req.params.postId}, title:${req.body.title}, image: ${req.body.image}, text:${req.body.text}`
    );
    const result = await updatePost(
      req.params.postId,
      req.body.title,
      req.body.text,
      req.body.image
    );
    if (result) {
      console.log(`Updated post #${req.params.postId} successfully`);
    }
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
    console.log(
      `Selecting posts from ${boardList.join(
        " "
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
    if (req.user) {
      res.status(200).render("createPost");
    }
  } catch (error) {
    next(error);
  }
};

export const readPostAndComments = async (req, res, next) => {
  try {
    console.log(`Selecting post and comments with postId ${req.params.postId}`);
    const result = await selectPostandComments(req.params.postId);
    // If result.post is null, render not found page.
    if (!result) {
      console.log("No post found");
    }
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
    console.log(`Deleting comment #${req.body.commentId}`);
    const result = await deleteComment(req.body.commentId);
    if (result) {
      console.log(`Deleted comment #${result.id} successfully`);
    }
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const removePost = async (req, res, next) => {
  try {
    console.log(`Deleting post #${req.body.postId}`);
    const result = await deletePost(req.body.postId);
    if (result) {
      console.log(`Deleted post #${result.id} successfully`);
    }
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
};
