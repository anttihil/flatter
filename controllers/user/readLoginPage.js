import log from "../../config/logging.js";

export default function readLoginPage(req, res, next) {
  try {
    log.info(`Rendering login page.`);
    res.status(200).render("login");
  } catch (error) {
    next(error);
  }
}
