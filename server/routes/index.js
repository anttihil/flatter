const postsRouter = require("./postsRouter");
const usersRouter = require("./usersRouter");
const categoriesRouter = require("./categoriesRouter");
const commentsRouter = require("./commentsRouter");

module.exports = (app) => {
  app.use("/api/posts", postsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/comments", commentsRouter);
};
