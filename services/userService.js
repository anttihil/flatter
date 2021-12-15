import db from "../config/db.js";

export const selectUser = async (req) => {
  try {
    const result = await db.oneOrNone("SELECT * FROM users WHERE user_id=$1", [
      req.params.user_id,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const selectNewestPostsInAll = async (count) =>
  // tx is an SQL transaction which can include multiple queries
  db.tx(async (t) => {
    const boards = await t.any(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    console.log(boards);
    const posts = await t.any(
      `SELECT board_name, post_id, post_title, post_text, user_nickname, post_created_at 
      FROM posts p
      INNER JOIN boards b 
        ON p.board_id = b.board_id 
      INNER JOIN users s 
        ON s.user_id = p.user_id 
      ORDER BY post_created_at DESC LIMIT 100 OFFSET $1`,
      [100 * count]
    );
    console.log(posts);
    return { boards, posts };
  });

export const selectAllUsers = async () => {
  try {
    const result = await query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const insertUser = async (req) => {
  try {
    const result = await query(
      "INSERT INTO users (username, password, email, create_date) values ($1, $2, $3, to_timestamp($4)) returning *",
      [req.body.username, req.body.password, req.body.email, Date.now() / 1000]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req) => {
  try {
    const result = await query(
      "DELETE FROM users WHERE user_id=$1 returning *",
      [req.params.user_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req) => {
  try {
    const result = await query(
      "UPDATE users SET username=$1, password=$2, email=$3 WHERE user_id=$4 RETURNING *",
      [req.body.username, req.body.password, req.body.email, req.params.user_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
