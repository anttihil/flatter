const express = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = express.Router();

usersRouter.get("/:id", usersController.getUserController);

usersRouter.get("/", usersController.getAllUsersController);

usersRouter.post("/", usersController.postUserController);

usersRouter.delete("/:id", usersController.deleteUserController);

usersRouter.put("/:id", usersController.updateUserController);

module.exports = usersRouter;

/* const express = require("express");
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
      "INSERT INTO users (username, password, email, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.username, req.body.password, req.body.email, Date.now() / 1000]
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
      "UPDATE users SET (username=$1, password=$2, email=$3) WHERE (user_id=$4) RETURNING *",
      [req.body.username, req.body.password, req.body.email]
    );
    res.status(200).json({
      status: "success",
      users: userUpdated.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = users; */
