import db from "../config/db.js";

export const selectUserActivity = async (userId) =>
  // tx is an SQL transaction which can include multiple queries
  db.tx(async (t) => {
    const posts = await t.any(
      `SELECT post_id, post_title, post_text, post_created_at, COUNT(post_id) 
      FROM posts p
      WHERE p.user_id = $1
      GROUP BY post_id
      ORDER BY post_created_at DESC`,
      [userId]
    );
    const comments = await t.any(
      `SELECT comment_id, comment_text, comment_created_at, COUNT(comment_id) 
      FROM comments c
      WHERE c.user_id = $1
      GROUP BY comment_id
      ORDER BY comment_created_at DESC`,
      [userId]
    );
    return { posts, comments };
  });

export const selectUser = async (userId) => {
  return await db.oneOrNone("SELECT * FROM users WHERE user_id=$1", [userId]);
};
