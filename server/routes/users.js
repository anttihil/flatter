const express = require("express");
const users = express.Router();
const db = require("../db");

users.get("/:id", async (req, res) => {
  try {
    const gotUser = await db.query("SELECT * FROM users WHERE user_id=$1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      users: gotUser.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// create a user, note: modify response for production
users.post("/", async (req, res) => {
  try {
    const userPosted = await db.query(
      "INSERT INTO users (user_id, category_id, text, password, create_date) values ($1, $2, $3, $4, to_timestamp($5)) returning *",
      [
        req.body.user_id,
        req.body.category_id,
        req.body.text,
        req.body.password,
        Date.now() / 1000,
      ]
    );
    res.status(201).json({
      status: "success",
      users: userPosted.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a user, modify response for production
users.delete("/:id", async (req, res) => {
  try {
    const userDeleted = await db.query(
      "DELETE FROM users WHERE user_id=$1 returning *",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      users: userDeleted.rows[0],
    });
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
    res.status(200).json({
      status: "success",
      users: userUpdated.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = users;
