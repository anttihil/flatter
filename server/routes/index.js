const express = require("express");

const posts = require("./posts");
const users = require("./users");
const categories = require("./categories");
const comments = require("./comments");

module.exports = (app) => {
  app.use("/api/posts", posts);
  app.use("/api/users", users);
  app.use("/api/categories", categories);
  app.use("/api/comments", comments);
};
