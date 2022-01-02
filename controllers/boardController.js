import {
  selectPostandComments,
  insertPost,
  selectPosts,
} from "../services/boardService.js";

export async function getBoard(req, res, next) {
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

export const getPostAndComments = async (req, res, next) => {
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
export const getCreatePost = async (req, res, next) => {
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
export const submitPost = async (req, res, next) => {
  // First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, insert post into the database
  // Then redirect to the landing page
  // remember to change the landing page to include a success modal with hidden class switch
  try {
    const result = await insertPost(
      req.body.board,
      req.user.id,
      req.body.title,
      req.body.text,
      req.body.image
    );
    res.status(201).redirect(`/board/${result.post_id}`);
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const editPost = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const submitComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// requires admin? authorization
export const deleteComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// requires authorization
export const updateComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
