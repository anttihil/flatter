import { selectUserActivity, insertUser } from "../services/userService.js";
import { selectBoards } from "../services/boardService.js";
import { hash } from "argon2";

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

export const readLoginPage = async (req, res, next) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    next(error);
  }
};

export const readRegisterPage = async (req, res, next) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    next(error);
  }
};

export const readRegisterSuccess = async (req, res, next) => {
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

export const createUser = async (req, res, next) => {
  try {
    console.log(req.body.password);
    const password = await hash(req.body.password);
    const result = await insertUser(
      req.body.email,
      password,
      req.body.username,
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

export const readUserPage = async (req, res, next) => {
  try {
    const result = await selectUserActivity(req.params.userId);
    res
      .status(200)
      .render("userPage", { posts: result.posts, comments: result.comments });
  } catch (error) {
    next(error);
  }
};

export const readUserSettings = async (req, res, next) => {
  try {
    res.status(200).render("userSettings");
  } catch (error) {
    next(error);
  }
};

export const readAdminDashboard = async (req, res, next) => {
  try {
    res.status(200).render("adminDashboard");
  } catch (error) {
    next(error);
  }
};
