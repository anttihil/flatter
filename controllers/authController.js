import { selectBoards } from "../services/boardService.js";
import { hash } from "argon2";

export const getLoginPage = async (req, res, next) => {
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("login", { boards: result });
  } catch (error) {
    next(error);
  }
};

/* export const getLoginSuccess = async (req, res, next) => {
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("loginSuccess", { boards: result });
  } catch (error) {
    next(error);
  }
};

export const getLoginFailure = async (req, res, next) => {
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("loginFailure", { boards: result });
  } catch (error) {
    next(error);
  }
}; */

export const getRegisterPage = async (req, res, next) => {
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("register", { boards: result });
  } catch (error) {
    next(error);
  }
};

export const getRegisterSuccess = async (req, res, next) => {
  try {
    const result = await selectBoards();
    res.status(200).render("registerSuccess", {});
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const password = await hash(req.body.password);
    const result = await insertUser(
      req.body.email,
      password,
      req.body.nickname,
      "user"
    );
    console.log(result);
    if (result) {
      res.status(200).redirect("success");
    } else
      res.render("/register", {
        emailCollision: "This email is in use already.",
      });
  } catch (error) {
    next(error);
  }
};

export const getUnauthorizedPage = async (req, res, next) => {
  try {
    const result = await selectBoards();
    console.log(result);
    res.status(200).render("unauthorizedPage", { boards: result });
  } catch (error) {
    next(error);
  }
};
