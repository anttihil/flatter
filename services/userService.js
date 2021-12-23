import db from "../config/db.js";

export const selectUserActivity = async (count) =>
  // tx is an SQL transaction which can include multiple queries
  db.tx(async (t) => {
    const boards = await t.any(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    console.log(boards);
    const activity = await t.any(
      `SELECT post_id, post_title, post_text, post_created_at, comment_id, comment_text, comment_created_at 
      FROM posts p
      INNER JOIN comments c 
        ON p.user_id = c.user_id 
      WHERE p.user_id = $1 
      ORDER BY post_created_at, comment_created_at DESC`,
      [req.params.userId]
    );
    console.log(activity);
    return { boards, activity };
  });

export const selectUser = async (req) => {
  try {
    const result = await db.oneOrNone("SELECT * FROM users WHERE user_id=$1", [
      req.params.userId,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};
