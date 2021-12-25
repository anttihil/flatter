import {
  selectBoards,
  selectNewestPostsInAll,
  selectNewestPostsInBoard,
  selectPostandComments,
  insertPost,
} from "../services/boardService.js";

//calls the get all board service function and sends a response
export const getAllBoardsNew = async (req, res, next) => {
  await selectNewestPostsInAll(req.params.count)
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => {
      next(error);
    });
};

export const getBoardNew = async (req, res, next) => {
  await selectNewestPostsInBoard(req.params.boardName, req.params.count)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => {
      next(error);
    });
};

export const getPostAndComments = async (req, res, next) => {
  try {
    const result = selectPostandComments(req.params.postId);
    res.status(200).render("readPost", {
      boards: result.boards,
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
  // Otherwise, render the creat post page
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("createPost", { boards: result });
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

// requires authorization
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
