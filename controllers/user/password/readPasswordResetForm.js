import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import log from "../../../config/logging.js";
import { selectUserPasswordByEmail } from "../../../services/userService.js";

export default async function readPasswordResetForm(req, res, next) {
  try {
    log.info(`Password reset request: reading token in query params.`);
    const payload = jwt.decode(req.query.token);
    const oldHashedPassword = await selectUserPasswordByEmail(payload.email);
    const verifiedPayload = jwt.verify(req.query.token, oldHashedPassword);
    log.info(
      `Password reset request: verified token with email: ${verifiedPayload.email}`
    );
    res.status(200).render("resetPassword");
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      next(
        createHttpError(
          400,
          "The verification link has expired. Please log in to try again."
        )
      );
    } else {
      next(
        createHttpError(
          400,
          "An error occurred with the verification link. Please log in to try again."
        )
      );
    }
  }
}
