import db from "./db.js";
import { hash } from "argon2";
import log from "./logging.js";

export async function adminSetup() {
  try {
    const admin = await db.oneOrNone(
      `SELECT role FROM users WHERE username=$1`,
      [process.env.ADMIN_USERNAME]
    );
    if (!admin) {
      const password = await hash(process.env.ADMIN_PASSWORD);
      const result = await db.one(
        `INSERT INTO users(email, username, role, password) 
          VALUES($1, $2, 'admin', $3)
          ON CONFLICT DO NOTHING
          RETURNING username;`,
        [process.env.ADMIN_EMAIL, process.env.ADMIN_USERNAME, password]
      );
      if (result) {
        log.info("Admin user created.");
      }
    } else {
      log.info("Admin user exists.");
    }
  } catch (error) {
    log.error(error);
  }
}
