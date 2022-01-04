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

export async function readBoard(req, res, next) {
  /*
	there should be ONE selectPosts function that accepts
	ALL the possible params and query strings as arguments
	That way we don't have write a tree of conditions
	with their own query functions. 

	Input validation belongs
	cases to deal with: 
	allowed values of req.param.boardName: all + app.locals.boards
	allowed fields of req.query: sort, count
		allowed values sort: new
		allowed values count: non-negative integer
	*/
  try {
    let boardList = [];
    if (req.params.boardName === "all") boardList = req.app.locals.boards;
    else boardList.push(req.params.boardName);
    console.log(boardList);
    let page = req.query.page ?? 0;
    let sort = req.query.sort ?? "new";
    const posts = await selectPosts(boardList, page, sort);
    console.log(posts);
    res.status(200).render("index", { posts: posts });
  } catch (error) {
    next(error);
  }
}

export const readPostAndComments = async (req, res, next) => {
  try {
    const result = await selectPostandComments(req.params.postId);
    // If result.post is null, render not found page.
    console.log(result);
    res.status(200).render("readPost", {
      post: result.post,
      comments: result.comments,
    });
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const readCreatePost = async (req, res, next) => {
  //First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, render the create post page
  try {
    res.status(200).render("createPost");
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
    console.log(req.body);
    const result = await insertPost(
      req.body.board,
      req.user.id,
      req.body.title,
      req.body.text,
      req.body.image
    );
    console.log(result);
    res.status(201).redirect(`/board/post/${result.post_id}`);
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editPost = async (req, res, next) => {
  try {
    console.log("Updated post params", req.params);
    console.log("Updated post body", req.body);
    const result = await updatePost(
      req.params.postId,
      req.body.title,
      req.body.text,
      req.body.image
    );
    console.log(result);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const removePost = async (req, res, next) => {
  try {
    const result = await deletePost(req.body.postId);
    console.log(result);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
};

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
    console.log(result);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires admin? authorization
export const removeComment = async (req, res, next) => {
  try {
    const result = await deleteComment(req.body.commentId);
    console.log(result);
    res.status(200).redirect("back");
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editComment = async (req, res, next) => {
  try {
    const result = await updateComment(req.params.commentId, req.body.text);
    console.log(result);
    res.status(201).redirect("back");
  } catch (error) {
    next(error);
  }
};
