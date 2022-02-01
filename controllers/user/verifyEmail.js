import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { updateUserVerification } from "../../services/userService.js";

export default async function verifyEmail(req, res, next) {
  try {
    const payload = jwt.verify(
      req.query.token,
      process.env.JWT_VERIFY_EMAIL_SECRET
    );
    const username = await updateUserVerification(payload.email);
    res.status(200).render("verificationSuccess", { username });
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
