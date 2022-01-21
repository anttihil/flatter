import log from "../../config/logging.js";

export default async function logoutUser(req, res, next) {
  try {
    log.info(`Logging out user #${req.user.id}`);
    req.logout();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}
