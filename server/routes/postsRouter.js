const express = require("express");
const posts = express.Router();
const db = require("../db");

//get xth set of newest posts in any category where x is count
posts.get("/n/:count", async (req, res) => {
  try {
    const postsResult = await db.query(
      "SELECT * FROM posts ORDER BY create_date DESC LIMIT 10 OFFSET $1",
      [10 * req.params.count]
    );
    res.status(200).json({
      status: "success",
      posts: postsResult.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//get xth set of most starred comments where x is count
posts.get("/s/:count", async (req, res) => {
  try {
    const postsResult = await db.query(
      "SELECT * FROM posts ORDER BY stars DESC LIMIT 10 OFFSET $1",
      [10 * req.params.count]
    );
    res.status(200).json({
      status: "success",
      posts: postsResult.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//get a post
posts.get("/:id", async (req, res) => {
  try {
    const gotPost = await db.query("SELECT * FROM posts WHERE post_id=$1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      posts: gotPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//create a post
posts.post("/", async (req, res) => {
  try {
    const postedResult = await db.query(
      "INSERT INTO posts (user_id, category_id, text) values ($1, $2, $3) returning *",
      [req.body.user_id, req.body.category_id, req.body.text]
    );
    res.status(201).json({
      status: "success",
      posts: postedResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a post with id
posts.delete("/:id", async (req, res) => {
  try {
    const deletedResult = await db.query(
      "DELETE FROM posts WHERE post_id=$1 returning *",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      posts: deletedResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//update a post (category, text or stars)
posts.put("/:id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE posts SET (category_id=$1, text=$2, stars=$3) WHERE (post_id=$4) RETURNING *",
      [req.body.category_id, req.body.text, req.body.stars, req.params.id]
    );
    res.status(200).json({
      status: "success",
      posts: updatedResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//update stars in a post ("upvote")
posts.put("/s/:id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE posts SET (stars=$1) WHERE (post_id=$2) RETURNING *",
      [req.body.stars, req.params.id]
    );
    res.status(200).json({
      status: "success",
      posts: updatedResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = posts;
