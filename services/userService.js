import db from "../config/db.js";

export function insertUser(email, password, username, role) {
  return db.one(
    `INSERT INTO users(email, password, username, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING username`,
    [email, password, username, role],
    (a) => a.username
  );
}

export function selectAllUserActivity() {
  // tx is an SQL transaction which can include multiple queries
  return db.tx(async (t) => {
    const users = await t.any(`
    SELECT id, username, latest_visit, is_permabanned, is_banned_until, created_at
    FROM users
    ORDER BY latest_visit DESC
    `);
    const posts = await t.any(
      `SELECT p.id, u.username, p.user_id, LEFT(p.title,150) AS title, p.image_url, p.last_changed_at, p.created_at 
      FROM posts p
      INNER JOIN users u
        ON p.user_id = u.id
      ORDER BY GREATEST(p.last_changed_at, p.created_at) DESC`
    );
    const comments = await t.any(
      `SELECT c.id, c.post_id, u.username, c.user_id, LEFT(c.text, 150) AS text, c.last_changed_at, c.created_at
      FROM comments c
      INNER JOIN users u
        ON c.user_id = u.id
      ORDER BY GREATEST(c.last_changed_at, c.created_at) DESC`
    );
    return { posts, comments, users };
  });
}

export function selectAllUsers() {
  return db.any(`
  SELECT id, username, email, is_verified, is_permabanned, is_banned_until  
  FROM users`);
}

export function selectEmail(email) {
  return db.any(`SELECT email FROM users WHERE email = $1`, [email]);
}

export function selectUsername(username) {
  return db.any(`SELECT username FROM users WHERE username = $1`, [username]);
}

export function selectUserActivity(userId) {
  // tx is an SQL transaction which can include multiple queries
  return db.tx(async (t) => {
    const posts = await t.any(
      `SELECT id, LEFT(title, 150) AS title, image_url, last_changed_at, created_at 
      FROM posts
      WHERE user_id = $1
      ORDER BY GREATEST(last_changed_at, created_at) DESC`,
      [userId]
    );
    const comments = await t.any(
      `SELECT id, post_id, LEFT(text, 150) AS text, last_changed_at, created_at
      FROM comments
      WHERE user_id = $1
      ORDER BY GREATEST(last_changed_at, created_at) DESC`,
      [userId]
    );
    return { posts, comments };
  });
}

export function selectUserForAuthentication(email) {
  return db.oneOrNone(
    `SELECT id, email, username, password, role  
    FROM users 
    WHERE email = $1`,
    [email]
  );
}

export function selectUserForDeserialize(userId) {
  return db.oneOrNone(
    `SELECT id, email, username, role 
      FROM users 
      WHERE id = $1`,
    [userId]
  );
}

export function updateUserBan(userId) {
  return db.oneOrNone(
    `UPDATE users
      SET is_permabanned = NOT is_permabanned
      WHERE id = $1
    RETURNING id`,
    [userId],
    (a) => a.id
  );
}

export function updateUserTempBan(userId, date) {
  return db.oneOrNone(
    `UPDATE users
      SET is_banned_until = $1
      WHERE id = $2
    RETURNING id, is_banned_until`,
    [date, userId]
  );
}

export function updateUserPassword(password, userId) {
  return db.one(
    `UPDATE users
      SET password=$1
      WHERE id=$2  
    RETURNING id`,
    [password, userId],
    (a) => a.id
  );
}

export function updateUserRole(role, userId) {
  return db.one(
    `UPDATE users
      SET role=$1
      WHERE id=$2  
    RETURNING id`,
    [role, userId],
    (a) => a.id
  );
}

export function updateUserUsername(username, userId) {
  return db.one(
    `UPDATE users
      SET username=$1
      WHERE id=$2  
    RETURNING id`,
    [username, userId],
    (a) => a.id
  );
}
