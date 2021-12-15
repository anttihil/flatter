import db from "../config/db.js";

export const selectBoards = async () => {
  return await db.any("SELECT board_name FROM boards ORDER BY board_name ASC");
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

export const selectNewestPostsInBoard = async (boardName, count) =>
  db.tx(async (t) => {
    const boards = await t.any(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    const posts = await t.any(
      `SELECT board_name, post_id, post_title, post_text, user_nickname, post_created_at 
        FROM posts p
        INNER JOIN boards b 
            ON p.board_id = b.board_id 
        INNER JOIN users s 
          ON s.user_id = p.user_id
        WHERE board_name = $1 
        ORDER BY post_created_at DESC LIMIT 100 OFFSET $2`,
      [boardName, 100 * count]
    );
    return { boards, posts };
  });

export const selectPostandComments = async (postId) =>
  db.tx(async (t) => {
    const boards = await t.any(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    const post = await t.one(
      `SELECT post_title, post_text, user_nickname, post_created_at 
        FROM posts p
        INNER JOIN users u 
          ON u.user_id = p.user_id
        WHERE p.post_id = $1`,
      [postId]
    );
    const comments = await t.any(
      `SELECT comment_text, user_nickname, comment_created_at
        FROM comments c
        INNER JOIN users u
          ON u.user_id = c.user_id
        WHERE c.post_id = $1
        ORDER BY comment_created_at DESC`,
      [postId]
    );
    return { boards, post, comments };
  });

export const insertPost = async (boardName, userId, title, text, image) => {
  db.tx(async (t) => {
    const boardId = await t.one(
      `SELECT board_id
      FROM boards b
      WHERE board_name=$1`,
      [boardName]
    );
    const result = await t.one(
      `INSERT INTO posts(user_id, board_id, post_title, post_text, post_image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING post_id, post_title`,
      [userId, boardId, title, text, image]
    );
    return result;
  });
};

export const insertComment = async (userId, postId, referenceId, text) => {
  return await db.one(
    `INSERT INTO posts(user_id, post_id, reference_id, comment_text)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
    [userId, postId, referenceId, text]
  );
};

export const updatePostTitle = async (title, postId) => {
  return await db.one(
    `UPDATE posts
    SET post_title=$1
    WHERE post_id=$2`,
    [title, postId]
  );
};

export const updatePostText = async (text, postId) => {
  return await db.one(
    `UPDATE posts
    SET post_text=$1
    WHERE post_id=$2`,
    [text, postId]
  );
};

export const updateCommentText = async (text, commentId) => {
  return await db.one(
    `UPDATE comments
    SET comment_text=$1
    WHERE comment_id=$2`,
    [text, commentId]
  );
};

export const deletePost = async (id) => {
  return await db.one(
    `DELETE FROM posts
    WHERE post_id=$1`,
    [id]
  );
};

export const deleteComment = async (id) => {
  return await db.one(
    `DELETE FROM comments
    WHERE comments_id=$1`,
    [id]
  );
};
