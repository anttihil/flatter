import log from "../../config/logging.js";

export default function readRegisterSuccess(req, res, next) {
  try {
    log.info(`Rendering register success page.`);
    res.status(200).render("registerSuccess");
  } catch (error) {
    next(error);
  }
}
