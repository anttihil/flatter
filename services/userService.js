import db from "../config/db.js";

/* 
Naming conventions for database services:
Creating a resource: insertX
Reading a resource: selectY
Update a resource: updateZ
Deleting a resource: deleteW
*/

export const insertUser = async (email, password, username, role) => {
  return await db.one(
    `INSERT INTO users(email, password, username, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING username`,
    [email, password, username, role],
    (a) => a.username
  );
};

export async function selectAllUsers() {
  return await db.any(`
  SELECT id, username, email, is_verified, is_permabanned, is_banned_until  
  FROM users`);
}

export const selectUserActivity = async (userId) =>
  // tx is an SQL transaction which can include multiple queries
  db.tx(async (t) => {
    const posts = await t.any(
      `SELECT id, title, LEFT(text, 150) AS text, image_url, last_changed_at, COUNT(id) AS amount 
      FROM posts
      WHERE user_id = $1
      GROUP BY id
      ORDER BY last_changed_at DESC`,
      [userId]
    );
    const comments = await t.any(
      `SELECT id, post_id, LEFT(text, 150) AS text, last_changed_at, COUNT(id) AS amount
      FROM comments
      WHERE user_id = $1
      GROUP BY id
      ORDER BY last_changed_at DESC`,
      [userId]
    );
    return { posts, comments };
  });

export const selectAllUserActivity = async () =>
  // tx is an SQL transaction which can include multiple queries
  db.tx(async (t) => {
    const users = await t.any(`
    SELECT id, username, latest_visit, is_permabanned, is_banned_until, created_at
    FROM users
    ORDER BY latest_visit DESC
    `);
    const posts = await t.any(
      `SELECT p.id, u.username, p.user_id, p.title, LEFT(p.text, 150) AS text, p.image_url, p.last_changed_at 
      FROM posts p
      INNER JOIN users u
        ON p.user_id = u.id
      ORDER BY last_changed_at DESC`
    );
    const comments = await t.any(
      `SELECT c.id, u.username, c.user_id, LEFT(c.text, 150) AS text, c.last_changed_at
      FROM comments c
      INNER JOIN users u
        ON c.user_id = u.id
      ORDER BY last_changed_at DESC`
    );
    return { posts, comments, users };
  });

export const selectUserForAuthentication = async (email) => {
  return await db.oneOrNone(
    `SELECT id, email, username, password, role  
    FROM users 
    WHERE email = $1`,
    [email]
  );
};

export const selectUserForDeserialize = async (userId) => {
  return await db.oneOrNone(
    `SELECT id, email, username, role 
      FROM users 
      WHERE id = $1`,
    [userId]
  );
};

export const updateUserPassword = async (password, userId) => {
  return await db.one(
    `UPDATE users
      SET password=$1
      WHERE id=$2  
    RETURNING id`,
    [password, userId],
    (a) => a.id
  );
};

export const updateUserRole = async (role, userId) => {
  return await db.one(
    `UPDATE users
      SET role=$1
      WHERE id=$2  
    RETURNING id`,
    [role, userId],
    (a) => a.id
  );
};

export const updateUserUsername = async (username, userId) => {
  return await db.one(
    `UPDATE users
      SET username=$1
      WHERE id=$2  
    RETURNING id`,
    [username, userId],
    (a) => a.id
  );
};
