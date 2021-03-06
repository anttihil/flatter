const db = require("../db");

//get xth set of newest comments in any category where x is count
exports.getNewestComments = async (req) => {
  try {
    const gotNewestComments = await db.query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY create_date DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
    return gotNewestComments;
  } catch (error) {
    console.log(error);
  }
};

//get xth set of most starred comments where x is count
exports.getStarredComments = async (req) => {
  try {
    const gotStarredComments = await db.query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY stars DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
    return gotStarredComments;
  } catch (error) {
    console.log(error);
  }
};

//get a comment by ID
exports.getComment = async (req) => {
  try {
    const gotComment = await db.query(
      "SELECT * FROM comments WHERE (comment_id=$1)",
      [req.params.comment_id]
    );
    return gotComment;
  } catch (error) {
    console.log(error);
  }
};

//post a new comment to a post
exports.postComment = async (req) => {
  try {
    const postedComment = await db.query(
      "INSERT INTO comments WHERE (post_id=$1) (user_id, category_id, text, create_date) values ($2, $3, $4, to_timestamp($5)) returning *",
      [
        req.params.post_id,
        req.body.user_id,
        req.body.category_id,
        req.body.text,
        Date.now() / 1000,
      ]
    );
    return postedComment;
  } catch (error) {
    console.log(error);
  }
};

//delete a comment in a post
exports.deleteComment = async (req) => {
  try {
    const deletedComment = await db.query(
      "DELETE FROM comments WHERE (comment_id=$1) returning *",
      [req.params.comment_id]
    );
    return deletedComment;
  } catch (error) {
    console.log(error);
  }
};

//update the category or text of a comment in a post
exports.updateComment = async (req) => {
  try {
    const updatedComment = await db.query(
      "UPDATE comments SET (category_id=$1, text=$2, stars=$3) WHERE (comment_id=$4) RETURNING *",
      [
        req.body.category_id,
        req.body.text,
        req.body.stars,
        req.params.comment_id,
      ]
    );
    return updatedComment;
  } catch (error) {
    console.log(error);
  }
};

//update the star count of a comment ("upvote")
exports.upvoteComment = async (req) => {
  try {
    const upvotedComment = await db.query(
      "UPDATE comments SET (stars=$1) WHERE (comment_id=$2) RETURNING *",
      [req.body.stars, req.params.comment_id]
    );
    return upvotedComment;
  } catch (error) {
    console.log(error);
  }
};
