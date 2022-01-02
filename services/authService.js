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
