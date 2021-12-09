import { selectBoards } from "../services/boardService.js";

export const getLoginPage = async (req, res, next) => {
    try {
        const result = await selectBoards(req);
        console.log(result)
        res
            .status(200)
            .render("login", { boards: result}) 
      } catch (error) {
        next(error)
      }
  };

export const getRegisterPage = async (req, res, next) => {
    try {
        const result = await selectBoards(req);
        console.log(result)
        res
            .status(200)
            .render("register", { boards: result}) 
      } catch (error) {
        next(error)
      }
  };

export const logInUser = async (req, res, next) => {
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

export const registerUser = async (req, res, next) => {
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