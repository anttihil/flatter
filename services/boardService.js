import { query } from "../db/db";

// get all boards
export const getAllBoards = async () => {
  try {
    const gotBoards = await query(
      "SELECT (board_name) FROM boards ORDER BY name ASC"
    );
    const gotNewestPosts = await query(
      "SELECT * FROM posts where category = $1 ORDER BY create_date DESC LIMIT 10 OFFSET $2",
      [req.params.category_id, 10 * req.params.count]
    );
    return { boards: gotBoards, posts: gotNewestPosts };
  } catch (error) {
    console.log(error);
  }
};

//get xth set of newest posts in any category where x is count
export const getNewestPosts = async (req) => {
  try {
    const gotNewestPosts = await query(
      "SELECT * FROM posts where category = $1 ORDER BY create_date DESC LIMIT 10 OFFSET $2",
      [req.params.category_id, 10 * req.params.count]
    );
    return gotNewestPosts;
  } catch (error) {
    console.log(error);
  }
};

//get xth set of most starred posts in category y where x is count
export const getStarredPosts = async (req) => {
  try {
    const gotStarredPosts = await query(
      "SELECT * FROM posts WHERE category = $1 ORDER BY stars DESC LIMIT 10 OFFSET $2",
      [req.params.category_id, 10 * req.params.count]
    );
    return gotStarredPosts;
  } catch (error) {
    console.log(error);
  }
};

//get a post
export const getPost = async (req) => {
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
export const postPost = async (req) => {
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
export const deletePost = async (req) => {
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
export const updatePost = async (req) => {
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
export const upvotePost = async (req) => {
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

//post a new board
export const postBoard = async (req) => {
  try {
    const postedBoard = await query(
      "INSERT INTO boards (name) values ($1) returning *",
      [req.body.name]
    );
    return postedBoard;
  } catch (error) {
    console.log(error);
  }
};

//delete a board
export const deleteBoard = async (req) => {
  try {
    const deletedBoard = await query(
      "DELETE FROM boards WHERE board_id=$1 returning *",
      [req.params.board_id]
    );
    return deletedBoard;
  } catch (error) {
    console.log(error);
  }
};

//update the name of a board
export const updateBoard = async (req) => {
  try {
    const updatedBoard = await query(
      "UPDATE boards SET name=$1 WHERE board_id=$2 RETURNING *",
      [req.body.name, req.params.board_id]
    );
    return updatedBoard;
  } catch (error) {
    console.log(error);
  }
};
