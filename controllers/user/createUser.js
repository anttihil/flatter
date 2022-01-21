import { hash } from "argon2";
import { validationResult } from "express-validator";
import { insertUser } from "../../services/userService.js";
import log from "../../config/logging.js";

export default async function createUser(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", { errors: errors.mapped() });
    }

    log.info(`Creating user ${req.body.username}`);
    const hashedPassword = await hash(req.body.password);
    const username = await insertUser(
      req.body.email,
      hashedPassword,
      req.body.username,
      "user"
    );
    log.info(`Created user ${username}.`);
    res.status(200).redirect("register/success");
  } catch (error) {
    next(error);
  }
}
