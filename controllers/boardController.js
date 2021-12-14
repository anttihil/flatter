import {
  selectBoards,
  selectNewestPostsInAll,
  selectNewestPostsInBoard,
  selectPostandComments,
} from "../services/boardService.js";

//calls the get all board service function and sends a response
export const getAllBoardsNew = async (req, res, next) => {
  await selectNewestPostsInAll(req)
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
  await selectNewestPostsInBoard(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => {
      next(error);
    });
};

//get a post
export const getPostAndComments = async (req, res, next) => {
  await selectPostandComments(req)
    .then((data) => {
      res
        .status(200)
        .render("readPost", {
          boards: data.boards,
          post: data.post,
          comments: data.comments,
        });
    })
    .catch((error) => next(error));
};

//get the create post page
export const getCreatePost = async (req, res, next) => {
  //First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, render the creat post page
  try {
    const result = await selectBoards(req);
    console.log(result);
    res.status(200).render("createPost", { boards: result });
  } catch (error) {
    next(error);
  }
};

export const submitPost = async (req, res, next) => {
  // First check if the user does not exist or user credentials do not match the session info
  // then: redirect to login/register
  // Otherwise, insert post into the database
  // Then redirect to the landing page
  // remember to change the landing page to include a success modal with hidden class switch
  await insertPost(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => next(error));
};

export const editPost = async (req, res, next) => {
  await selectPostandComments(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => next(error));
};

export const submitComment = async (req, res, next) => {
  await selectPostandComments(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => next(error));
};

export const deleteComment = async (req, res, next) => {
  await selectPostandComments(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => next(error));
};

export const updateComment = async (req, res, next) => {
  await selectPostandComments(req)
    .then((data) => {
      res
        .status(200)
        .render("index", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => next(error));
};

/* 
//calls the post Board service function and sends a response
export const postBoardController = async (req, res) => {
  try {
    const postedBoard = await boardService.postBoard(req);
    res.status(201).json({
      status: "success",
      boards: postedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the delete Board service function and sends a response
export const deleteBoardController = async (req, res) => {
  try {
    const deletedBoard = await boardService.deleteBoard(req);
    res.status(200).json({
      status: "success",
      boards: deletedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the update Board service function and sends a response
export const updateBoardController = async (req, res) => {
  try {
    const updatedBoard = await boardService.updateBoard(req);
    res.status(200).json({
      status: "success",
      boards: updatedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
}; */
