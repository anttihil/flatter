import db from "../config/db.js";
//select a post
export const selectPost = async (req) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE post_id=$1", [
      req.params.post_id,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//create a post
export const insertPost = async (req) => {
  try {
    const result = await query(
      "INSERT INTO posts (user_id, category_id, text, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.user_id, req.body.category_id, req.body.text, Date.now() / 1000]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

//delete a post with id
export const deletePost = async (req) => {
  try {
    const result = await query(
      "DELETE FROM posts WHERE post_id=$1 returning *",
      [req.params.id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

//update a post (category, text or stars)
export const updatePost = async (req) => {
  try {
    const result = await query(
      "UPDATE posts SET category_id=$1, text=$2, stars=$3 WHERE post_id=$4 RETURNING *",
      [req.body.category_id, req.body.text, req.body.stars, req.params.id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

//update stars in a post ("upvote")
export const upvotePost = async (req) => {
  try {
    const result = await query(
      "UPDATE posts SET stars=$1 WHERE post_id=$2 RETURNING *",
      [req.body.stars, req.params.id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
