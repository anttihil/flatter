const express = require("express");
const users = express.Router();
const db = require("../db");

users.get("/:id", async (req, res) => {
  try {
    const gotUser = await db.query("SELECT * FROM users WHERE user_id=$1", [
      req.params.id,
    ]);
  } catch (error) {
    console.log(error);
  }
});

users.post("/", async (req, res) => {
  try {
    const userPosted = await db.query(
      "INSERT INTO users (user_id, category_id, text) values ($1, $2, $3) returning *",
      [req.body.user_id, req.body.category_id, req.body.text]
    );
  } catch (error) {
    console.log(error);
  }
});

users.delete("/:id", async (req, res) => {
  try {
    const userDeleted = await db.query(
      "DELETE FROM users WHERE user_id=$1 returning *",
      [req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

users.put("/:id", async (req, res) => {
  try {
    const userUpdated = await db.query(
      "UPDATE users SET (category_id=$1, text=$2, stars=$3) WHERE (user_id=$4) RETURNING *",
      [req.body.category_id, req.body.text, req.body.stars, req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports(users);
