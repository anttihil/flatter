import { hash } from "argon2";
import { validationResult } from "express-validator";
import {
  selectUserPassword,
  updateUsername,
  updateUserPassword,
} from "../../../services/userService.js";
import log from "../../../config/logging.js";

export default async function editUserPassword(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("userDashboard", { validationErrors: errors.mapped() });
    }
    log.info(`Updating password of #${req.user.id}`);
    const hashedOldPassword = await hash(req.body.oldPassword);
    const result = await selectUserPassword(req.user.id);
    if (hashedOldPassword === result) {
      const hashedNewPassword = await hash(req.body.newPassword);
      const id = await updateUserPassword(hashedNewPassword, req.user.id);
      log.info(`Updated username of #${id}`);
      res
        .status(200)
        .render("userDashboard", {
          passwordSuccess: "Your password was changed successfully.",
        });
    } else {
      log.info(
        `User #${req.user.id} tried to update password but failed due to wrong password.`
      );
      res.status(400).render("userDashboard", {
        message: "Your old password was incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
}
