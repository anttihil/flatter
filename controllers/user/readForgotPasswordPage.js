import log from "../../config/logging.js";

export default function readForgotPasswordPage(req, res, next) {
  try {
    log.info(`Rendering forgot password page.`);
    res.status(200).render("forgotPassword");
  } catch (error) {
    next(error);
  }
}
