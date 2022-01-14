import { selectUserActivity, insertUser } from "../services/userService.js";
import { hash } from "argon2";
import log from "../config/logging.js";

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

export const createUser = async (req, res, next) => {
  try {
    log.info(`Creating user ${req.body.username}`);
    const hashedPassword = await hash(req.body.password);
    const username = await insertUser(
      req.body.email,
      hashedPassword,
      req.body.username,
      "user"
    );
    log.info(`Created user ${username}.`);
    res.status(200).redirect("register/success");
  } catch (error) {
    next(error);
  }
};

export const logoutUser = function (req, res, next) {
  try {
    req.logout();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const readAdminDashboard = (req, res, next) => {
  try {
    res.status(200).render("adminDashboard");
  } catch (error) {
    next(error);
  }
};

export function readForgotPasswordPage(req, res, next) {
  try {
    res.status(200).render("forgotPassword");
  } catch (error) {
    next(error);
  }
}

export const readRegisterPage = async (req, res, next) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    next(error);
  }
};

export const readRegisterSuccess = (req, res, next) => {
  try {
    res.status(200).render("registerSuccess");
  } catch (error) {
    next(error);
  }
};

export const readUserDashboard = async (req, res, next) => {
  try {
    const result = await selectUserActivity(req.user.id);
    res.status(200).render("userDashboard", {
      posts: result.posts,
      comments: result.comments,
    });
  } catch (error) {
    next(error);
  }
};

export const readLoginPage = async (req, res, next) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    next(error);
  }
};
