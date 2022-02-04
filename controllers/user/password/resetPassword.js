import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import log from "../../../config/logging.js";
import { hash } from "argon2";
import {
  updateUserPasswordByEmail,
  selectUserPasswordByEmail,
} from "../../../services/userService.js";
import { validationResult } from "express-validator";

export default async function resetPassword(req, res, next) {
  try {
    log.info(`Processing password reset form data.`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error("Validation error with password reset form data.");
      return res
        .status(400)
        .render("resetPassword", { validationErrors: errors.mapped() });
    }
    const payload = jwt.decode(req.query.token);
    const oldHashedPassword = await selectUserPasswordByEmail(payload.email);
    const verifiedPayload = jwt.verify(req.query.token, oldHashedPassword);
    log.info(
      `Password reset form data: verified token with email: ${verifiedPayload.email}`
    );
    // hash the new password
    const newHashedPassword = await hash(req.body.newPassword);
    // update password in database on the basis of verifiedPayload.email
    const email = await updateUserPasswordByEmail(
      newHashedPassword,
      verifiedPayload.email
    );
    log.info(`Updated password of email: ${email}`);
    res.status(200).render("resetPasswordSuccess");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(
        createHttpError(
          400,
          "The verification link has expired. Please try again."
        )
      );
    } else {
      next(
        createHttpError(400, "An error occurred with the verification link.")
      );
    }
  }
}
