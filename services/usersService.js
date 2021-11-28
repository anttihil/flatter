const db = require("../db");

exports.getUser = async (req) => {
  try {
    const gotUser = await db.query("SELECT * FROM users WHERE user_id=$1", [
      req.params.user_id,
    ]);
    return gotUser;
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async () => {
  try {
    const gotUser = await db.query("SELECT * FROM users");
    return gotUser;
  } catch (error) {
    console.log(error);
  }
};

exports.postUser = async (req) => {
  try {
    const postedUser = await db.query(
      "INSERT INTO users (username, password, email, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.username, req.body.password, req.body.email, Date.now() / 1000]
    );
    return postedUser;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req) => {
  try {
    const deletedUser = await db.query(
      "DELETE FROM users WHERE user_id=$1 returning *",
      [req.params.user_id]
    );
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req) => {
  try {
    const updatedUser = await db.query(
      "UPDATE users SET username=$1, password=$2, email=$3 WHERE user_id=$4 RETURNING *",
      [req.body.username, req.body.password, req.body.email, req.params.user_id]
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};
