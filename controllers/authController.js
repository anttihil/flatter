import { selectBoards } from "../services/boardService.js";
import { hash } from "argon2";

export const getLoginPage = async (req, res, next) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    next(error);
  }
};

export const getRegisterPage = async (req, res, next) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    next(error);
  }
};

export const getRegisterSuccess = async (req, res, next) => {
  try {
    res.status(200).render("registerSuccess");
  } catch (error) {
    next(error);
  }
};

export const logoutUser = function (req, res, next) {
  req.logout();
  res.redirect("/");
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
