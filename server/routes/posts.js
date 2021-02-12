const express = require("express");
const posts = express.Router();
const db = require("../db");

posts.get("/api/posts", async (req, res) => {
  const postsResult = await db.query("SELECT * FROM posts");
});

posts.get("/api/posts/:id", async (req, res) => {
  const gotPost = await db.query("SELECT $1 FROM posts", [req.params.id]);
});

posts.post("/api/posts", async (req, res) => {
  const postedResult = await db.query(
    "INSERT INTO posts (user_id, category_id, text) values ($1, $2, $3) returning *",
    [req.body.user_id, req.body.category_id, req.body.text]
  );
});

posts.delete("/api/posts/:id", async (req, res) => {
  const deletedResult = await db.query(
    "DELETE FROM posts WHERE post_id=$1 returning *",
    [req.params.id]
  );
});

posts.put("api/posts/:id", async (req, res) => {
  const updatedResult = await db.query(
    "UPDATE posts SET (category_id=$1, text=$2, stars=$3) WHERE (post_id=$4) RETURNING *",
    [req.body.category_id, req.body.text, req.body.stars, req.params.id]
  );
});
