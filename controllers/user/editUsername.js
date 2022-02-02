import { validationResult } from "express-validator";
import { updateUsername } from "../../services/userService.js";
import log from "../../config/logging.js";

export default async function editUsername(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("userDashboard", { validationErrors: errors.mapped() });
    }
    log.info(`Updating username of #${req.user.id} to ${req.body.username}`);
    const username = await updateUsername(req.body.username, req.user.id);
    log.info(`Updated username of #${username} to ${req.body.username}`);
    res
      .status(200)
      .render("userDashboard", {
        usernameSuccess: "Your username was changed successfully.",
      });
  } catch (error) {
    next(error);
  }
}
