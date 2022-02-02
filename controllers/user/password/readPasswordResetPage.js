import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import log from "../../../config/logging.js";

export default async function readPasswordResetPage(req, res, next) {
  try {
    const payload = jwt.decode(req.query.token);
    const oldHashedPassword = await selectPasswordByEmail(payload.email);
    const verifiedPayload = jwt.verify(payload.email, oldHashedPassword);
    log.info(
      `Password reset: verified token with email: ${verifiedPayload.email}`
    );
    res.status(200).render("resetPassword");
  } catch (error) {
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
