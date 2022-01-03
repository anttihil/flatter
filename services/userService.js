import db from "../config/db.js";

export const selectUserForAuthentication = async (email) => {
  return await db.oneOrNone(
    `SELECT user_id, user_email, user_nickname, user_password, user_role  
    FROM users 
    WHERE user_email = $1`,
    [email]
  );
};

export const selectUserForDeserialize = async (userId) => {
  return await db.oneOrNone(
    `SELECT user_id, user_email, user_nickname, user_role 
        FROM users 
        WHERE user_id = $1`,
    [userId]
  );
};

export const insertUser = async (email, password, nickname, role) => {
  return await db.one(
    `INSERT INTO users(user_email, user_password, user_nickname, user_role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [email, password, nickname, role]
  );
};

export const updateUserPassword = async (password, userId) => {
  return await db.one(
    `UPDATE users
      SET user_password=$1
      WHERE user_id=$2  
      RETURNING *`,
    [password, userId]
  );
};

export const updateUserNickname = async (nickname, userId) => {
  return await db.one(
    `UPDATE users
        SET user_nickname=$1
        WHERE user_id=$2  
        RETURNING *`,
    [nickname, userId]
  );
};

export const updateUserRole = async (role, userId) => {
  return await db.one(
    `UPDATE users
        SET user_role=$1
        WHERE user_id=$2  
        RETURNING *`,
    [role, userId]
  );
};

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
