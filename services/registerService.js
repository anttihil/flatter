import { query } from "../db/db";

export const postNewUser = async (req) => {
  try {
    const postedUser = await query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [req.body.username, req.body.password, req.body.email]
    );
    return postedUser;
  } catch (error) {
    console.log(error);
  }
};
