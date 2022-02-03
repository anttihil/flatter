import { hash, verify } from "argon2";
import { validationResult } from "express-validator";
import {
  selectUserPassword,
  updateUserPassword,
} from "../../../services/userService.js";
import log from "../../../config/logging.js";

export default async function editUserPassword(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).redirect("/user/dashboard?passwordChange=failure");
    }
    log.info(`Updating password of #${req.user.id}`);
    const hashedOldPassword = await selectUserPassword(req.user.id);
    const result = await verify(hashedOldPassword, req.body.oldPassword);
    if (result) {
      const hashedNewPassword = await hash(req.body.newPassword);
      const id = await updateUserPassword(hashedNewPassword, req.user.id);
      log.info(`Updated password of #${id}`);
      res.status(200).redirect("/user/dashboard?passwordChange=success");
    } else {
      log.info(
        `User #${req.user.id} tried to update password but failed due to wrong old password.`
      );
      res.status(400).redirect("/user/dashboard?passwordChange=old");
    }
  } catch (error) {
    next(error);
  }
}
