const homepage = require("./homepage");
const posts = require("./posts");
const users = require("./users");

module.exports = (app) => {
  app.use("/", homepage);
  app.use("/p/:id", posts);
  app.use("/u/:id", users);
};
