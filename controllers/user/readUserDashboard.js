import { selectUserActivity } from "../../services/userService.js";
import log from "../../config/logging.js";

export default async function readUserDashboard(req, res, next) {
  try {
    log.info(`Selecting user activity for user #${req.user.id}`);
    const result = await selectUserActivity(req.user.id);
    log.info(`Selected user activity for user #${req.user.id}`);
    console.log(req.query);
    res.status(200).render("userDashboard", {
      posts: result.posts,
      comments: result.comments,
      csrfToken: req.csrfToken(),
      usernameChange: req.query.usernameChange,
      passwordChange: req.query.passwordChange,
    });
  } catch (error) {
    next(error);
  }
}
