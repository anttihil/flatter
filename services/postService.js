//get a post
exports.getPost = async (req) => {
  try {
    const gotPost = await query("SELECT * FROM posts WHERE post_id=$1", [
      req.params.id,
    ]);
    return gotPost;
  } catch (error) {
    console.log(error);
  }
};

//create a post
exports.postPost = async (req) => {
  try {
    const postedPost = await query(
      "INSERT INTO posts (user_id, category_id, text, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.user_id, req.body.category_id, req.body.text, Date.now() / 1000]
    );
    return postedPost;
  } catch (error) {
    console.log(error);
  }
};

//delete a post with id
exports.deletePost = async (req) => {
  try {
    const deletedPost = await query(
      "DELETE FROM posts WHERE post_id=$1 returning *",
      [req.params.id]
    );
    return deletedPost;
  } catch (error) {
    console.log(error);
  }
};

//update a post (category, text or stars)
exports.updatePost = async (req) => {
  try {
    const updatedPost = await query(
      "UPDATE posts SET category_id=$1, text=$2, stars=$3 WHERE post_id=$4 RETURNING *",
      [req.body.category_id, req.body.text, req.body.stars, req.params.id]
    );
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

//update stars in a post ("upvote")
exports.upvotePost = async (req) => {
  try {
    const updatedStars = await query(
      "UPDATE posts SET stars=$1 WHERE post_id=$2 RETURNING *",
      [req.body.stars, req.params.id]
    );
    return updatedStars;
  } catch (error) {
    console.log(error);
  }
};
