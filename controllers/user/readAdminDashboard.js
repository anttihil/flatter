import { selectAllUserActivity } from "../../services/userService.js";
import log from "../../config/logging.js";

export default async function readAdminDashboard(req, res, next) {
  try {
    log.info(`Selecting all user activity for admin dashboard.`);
    const result = await selectAllUserActivity();
    log.info(`Selected all user activity for admin dashboard.`);
    res.status(200).render("adminDashboard", {
      posts: result.posts,
      comments: result.comments,
      users: result.users,
    });
  } catch (error) {
    next(error);
  }
}
