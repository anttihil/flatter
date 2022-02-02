import { updateUserBan } from "../../../services/userService.js";
import log from "../../../config/logging.js";

export default async function toggleUserBan(req, res, next) {
  try {
    log.info(`Toggling ban status for user #${req.query.user}`);
    const id = await updateUserBan(req.query.user);
    log.info(`Toggled ban status for user #${id}`);
    res.redirect("back");
  } catch (error) {
    next(error);
  }
}
