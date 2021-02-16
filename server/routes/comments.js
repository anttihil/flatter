const express = require("express");
const comments = express.Router();
const db = require("../db/");

// get xth set of 10 newest comments where x is count
comments.get("/:post_id/n/:count", async (req, res) => {
  try {
    const commentsResult = await db.query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY create_date DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
  } catch (error) {
    console.log(error);
  }
});

// get xth set of 10 most starred comments where x is count
comments.get("/:post_id/s/:count", async (req, res) => {
  try {
    const commentsResult = await db.query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY stars DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
  } catch (error) {
    console.log(error);
  }
});

//get a comment to a post (both have their own ids in http params)
comments.get(":post_id/:comment_id", async (req, res) => {
  try {
    const gotPost = await db.query(
      "SELECT * FROM comments WHERE (post_id=$1, comment_id=$2)",
      [req.params.post_id, req.params.comment_id]
    );
  } catch (error) {
    console.log(error);
  }
});

//post a new comment to a post
comments.post("/:post_id/", async (req, res) => {
  try {
    const postedResult = await db.query(
      "INSERT INTO comments WHERE (post_id=$1) (user_id, category_id, text) values ($2, $3, $4) returning *",
      [
        req.params.post_id,
        req.body.user_id,
        req.body.category_id,
        req.body.text,
      ]
    );
  } catch (error) {
    console.log(error);
  }
});

//delete a comment in a post
comments.delete("/:post_id/:comment_id", async (req, res) => {
  try {
    const deletedResult = await db.query(
      "DELETE FROM comments WHERE (comment_id=$1) returning *",
      [req.params.comment_id]
    );
  } catch (error) {
    console.log(error);
  }
});

//update the category or text of a comment in a post
comments.put("/:post_id/:comment_id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE comments SET (category_id=$1, text=$2, stars=$3) WHERE (comment_id=$4) RETURNING *",
      [
        req.body.category_id,
        req.body.text,
        req.body.stars,
        req.params.comment_id,
      ]
    );
  } catch (error) {
    console.log(error);
  }
});

//update the star count of a comment ("upvote")
comments.put("/:post_id/:comment_id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE comments SET (stars=$1) WHERE (comment_id=$2) RETURNING *",
      [req.body.stars, req.params.comment_id]
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports(comments);
