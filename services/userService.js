import db from "../config/db.js";

export const selectUserActivity = async (userId) => {
  return await db.any(
    `SELECT post_id, post_title, post_text, post_created_at, comment_id, comment_text, comment_created_at 
  FROM posts p
  INNER JOIN comments c 
    ON p.user_id = c.user_id 
  WHERE p.user_id = $1 
  ORDER BY post_created_at, comment_created_at DESC`,
    [userId]
  );
};

export const selectUser = async (userId) => {
  return await db.oneOrNone("SELECT * FROM users WHERE user_id=$1", [userId]);
};
