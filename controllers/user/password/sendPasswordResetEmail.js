import log from "../../../config/logging.js";
import MailerSend from "mailersend";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../../../services/userService.js";

export default async function sendPasswordResetEmail(req, res, next) {
  try {
    log.info(
      `Selecting user by email before sending a verification email: ${req.body.email}.`
    );
    const user = await selectUserByEmail(req.body.email);
    if (user) {
      log.info(`Sending a password reset email to ${user.email}.`);
      const Recipient = MailerSend.Recipient;
      const EmailParams = MailerSend.EmailParams;
      const mailersend = new MailerSend({
        api_key: process.env.MAILERSEND_API_KEY,
      });
      const recipients = [new Recipient(user.email, user.username)];
      const token = jwt.sign({ email: user.email }, user.password, {
        expiresIn: "1h",
      });
      const emailParams = new EmailParams()
        .setFrom(`noreply@${process.env.SERVER_DOMAIN}`)
        .setFromName("Aihio")
        .setRecipients(recipients)
        .setSubject(`User Password Reset for ${process.env.DOMAIN_NAME}`)
        .setHtml(
          `
          <!doctype html>
          <html lang="en">
            <head>
              <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            </head>
            <body>
              <h1>According to our records, you requested to reset your password for ${process.env.DOMAIN_NAME}</h1>
                <p>If this information is not correct, please disregard this email.</p>  
                <p>Here is a link to reset your password:<br /> 
                  <a href="https://${process.env.SERVER_DOMAIN}/user/verify?token=${token}">https://${process.env.SERVER_DOMAIN}/user/verify?token=${token}</a>
                </p>
                <p>This link will be active for one hour.</p>
            </body>
          </html>
          `
        );
      mailersend.send(emailParams);
      log.info(`Sent a password reset email to ${user.email}`);
    } else {
      log.info(`Password reset request: Invalid email: ${req.body.email}`);
    }
    res.status(200).render("emailSent");
  } catch (error) {
    next(error);
  }
}
