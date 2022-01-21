import { updateUserTempBan } from "../../services/userService.js";
import log from "../../config/logging.js";

export default async function setUserTempBan(req, res, next) {
  try {
    log.info(
      `Setting temporary ban date for user #${req.params.userId} as ${req.body.date}`
    );
    const result = await updateUserTempBan(req.params.userId, req.body.date);
    log.info(`Set temporary ban date for user #${result.id} as ${result.date}`);
    res.redirect("back");
  } catch (error) {
    next(error);
  }
}
