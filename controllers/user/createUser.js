import { hash } from "argon2";
import { validationResult } from "express-validator";
import { insertUser } from "../../services/userService.js";
import log from "../../config/logging.js";
import MailerSend from "mailersend";
import jwt from "jsonwebtoken";

export default async function createUser(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("register", { validationErrors: errors.mapped() });
    }

    log.info(`Creating user ${req.body.username}`);
    const hashedPassword = await hash(req.body.password);
    const user = await insertUser(
      req.body.email,
      hashedPassword,
      req.body.username,
      "user"
    );
    log.info(
      `Created user ${user.username} and now sending a verification email to ${user.email}.`
    );
    const Recipient = MailerSend.Recipient;
    const EmailParams = MailerSend.EmailParams;
    const mailersend = new MailerSend({
      api_key: process.env.MAILERSEND_API_KEY,
    });
    const recipients = [new Recipient(user.email, user.username)];
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_VERIFY_EMAIL_SECRET,
      { expiresIn: "1d" }
    );
    const emailParams = new EmailParams()
      .setFrom(`noreply@${process.env.SERVER_DOMAIN}`)
      .setFromName("Aihio")
      .setRecipients(recipients)
      .setSubject(`User Email Verification for ${process.env.DOMAIN_NAME}`)
      .setHtml(
        `<!doctype html>
        <html lang="en">
          <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          </head>
          <body>
            <h1>Welcome to ${process.env.DOMAIN_NAME}</h1>
              <p>If this information is not correct, please disregard this email.</p>  
              <p>Here is a link to verify your email address:<br /> 
                <a href="${process.env.SERVER_DOMAIN_WITH_HTTP}/user/email/verify?token=${token}">${process.env.SERVER_DOMAIN_WITH_HTTP}/user/email/verify?token=${token}</a>
              </p>
              <p>This link will be active for one day.</p>
          </body>
        </html>
        `
      );
    mailersend.send(emailParams);
    log.info(`Sent a verification email to ${user.email}`);
    res.status(200).redirect("register/success");
  } catch (error) {
    next(error);
  }
}
