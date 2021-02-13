const express = require("express");
const posts = express.Router();
const db = require("../db");

posts.get("/api/posts/n/:count", async (req, res) => {
  try {
    const postsResult = await db.query(
      "SELECT * FROM posts ORDER BY create_date DESC LIMIT 10 OFFSET $1",
      [10 * req.params.count]
    );
  } catch (error) {
    console.log(error);
  }
});

posts.get("/api/posts/s/:count", async (req, res) => {
  try {
    const postsResult = await db.query(
      "SELECT * FROM posts ORDER BY stars DESC LIMIT 10 OFFSET $1",
      [10 * req.params.count]
    );
  } catch (error) {
    console.log(error);
  }
});

posts.get("/api/posts/:id", async (req, res) => {
  try {
    const gotPost = await db.query("SELECT * FROM posts WHERE post_id=$1", [
      req.params.id,
    ]);
  } catch (error) {
    console.log(error);
  }
});

posts.post("/api/posts", async (req, res) => {
  try {
    const postedResult = await db.query(
      "INSERT INTO posts (user_id, category_id, text) values ($1, $2, $3) returning *",
      [req.body.user_id, req.body.category_id, req.body.text]
    );
  } catch (error) {
    console.log(error);
  }
});

posts.delete("/api/posts/:id", async (req, res) => {
  try {
    const deletedResult = await db.query(
      "DELETE FROM posts WHERE post_id=$1 returning *",
      [req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

posts.put("api/posts/:id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE posts SET (category_id=$1, text=$2, stars=$3) WHERE (post_id=$4) RETURNING *",
      [req.body.category_id, req.body.text, req.body.stars, req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

posts.put("api/posts/s/:id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE posts SET (stars=$1) WHERE (post_id=$2) RETURNING *",
      [req.body.stars, req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports(posts);
