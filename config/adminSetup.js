import db from "./db.js";
import { hash } from "argon2";

export async function adminSetup() {
  try {
    const password = await hash(process.env.ADMIN_PASSWORD);
    const result = await db.oneOrNone(
      `INSERT INTO users(user_email, user_nickname, user_role, user_password) 
        VALUES($1, $2, 'admin', $3)
        ON CONFLICT DO NOTHING
        RETURNING *;`,
      [process.env.ADMIN_EMAIL, process.env.ADMIN_NICKNAME, password]
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
