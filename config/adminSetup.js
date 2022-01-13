import db from "./db.js";
import { hash } from "argon2";

export async function adminSetup() {
  try {
    const password = await hash(process.env.ADMIN_PASSWORD);
    const result = await db.oneOrNone(
      `INSERT INTO users(email, username, role, password) 
        VALUES($1, $2, 'admin', $3)
        ON CONFLICT DO NOTHING
        RETURNING *;`,
      [process.env.ADMIN_EMAIL, process.env.ADMIN_USERNAME, password]
    );
    console.log("Init admin:", result);
  } catch (error) {
    console.error(error);
  }
}
