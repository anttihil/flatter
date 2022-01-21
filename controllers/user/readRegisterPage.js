import log from "../../config/logging.js";

export default function readRegisterPage(req, res, next) {
  try {
    log.info(`Rendering register page.`);
    res.status(200).render("register");
  } catch (error) {
    next(error);
  }
}
