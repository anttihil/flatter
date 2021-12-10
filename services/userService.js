import db from "../config/db.js";

export const selectUser = async (req) => {
  try {
    const result = await query("SELECT * FROM users WHERE user_id=$1", [
      req.params.user_id,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const selectAllUsers = async () => {
  try {
    const result = await query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const insertUser = async (req) => {
  try {
    const result = await query(
      "INSERT INTO users (username, password, email, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.username, req.body.password, req.body.email, Date.now() / 1000]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req) => {
  try {
    const result = await query(
      "DELETE FROM users WHERE user_id=$1 returning *",
      [req.params.user_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req) => {
  try {
    const result = await query(
      "UPDATE users SET username=$1, password=$2, email=$3 WHERE user_id=$4 RETURNING *",
      [req.body.username, req.body.password, req.body.email, req.params.user_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
