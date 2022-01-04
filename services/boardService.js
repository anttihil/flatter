import db from "../config/db.js";

/* 
Naming conventions for database services:
Creating a resource: insertX
Reading a resource: selectY
Update a resource: updateZ
Deleting a resource: deleteW
*/

export const selectBoards = async () => {
  return await db.any("SELECT board_name FROM boards ORDER BY board_name ASC");
};

// sort could be also active which requires that we join also comments
// if sort == "active" we can select first from comments
export async function selectPosts(boardList, page, sort) {
  const posts = await db.any(
    `SELECT board_name, post_id, post_title, LEFT(post_text, 300) AS post_text, p.user_id, user_nickname, post_created_at 
    FROM posts p
    INNER JOIN boards b 
      ON p.board_id = b.board_id 
    INNER JOIN users u 
      ON u.user_id = p.user_id 
    WHERE board_name IN ($1:list) 
    ORDER BY post_created_at DESC LIMIT 100 OFFSET $2`,
    [boardList, page]
  );
  return posts;
}

export const selectPostandComments = async (postId) =>
  // tx is a postgreSQL transaction which contains many queries.
  // We use many queries in one transaction for a performance boost.
  db.tx(async (t) => {
    const post = await t.oneOrNone(
      `SELECT post_id, post_title, post_text, p.user_id, user_nickname, post_created_at 
        FROM posts p
        INNER JOIN users u 
          ON u.user_id = p.user_id
        WHERE p.post_id = $1`,
      [postId]
    );
    const comments = await t.any(
      `SELECT comment_id, reference_id, comment_text, c.user_id, user_nickname, comment_created_at
        FROM comments c
        INNER JOIN users u
          ON u.user_id = c.user_id
        WHERE c.post_id = $1
        ORDER BY comment_created_at ASC`,
      [postId]
    );
    return { post, comments };
  });

// image is an optional parameter
export const insertPost = async (boardName, userId, title, text, image) => {
  return db.tx(async (t) => {
    const result1 = await t.one(
      `SELECT board_id
      FROM boards b
      WHERE board_name=$1`,
      [boardName]
    );
    const result2 = await t.one(
      `INSERT INTO posts(user_id, board_id, post_title, post_text, post_image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING post_id`,
      [userId, result1.board_id, title, text, image]
    );
    return result2;
  });
};
// referenceId is an optional parameter
export const insertComment = async (userId, postId, text, referenceId) => {
  return await db.one(
    `INSERT INTO comments(user_id, post_id, comment_text, reference_id)
      VALUES ($1, $2, $3, $4)
      RETURNING comment_id`,
    [userId, postId, text, referenceId]
  );
};

export const insertCommentChain = async (userId, postId, referenceId, text) => {
  return await db.one(
    `INSERT INTO posts(user_id, post_id, reference_id, comment_text)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
    [userId, postId, referenceId, text]
  );
};
// image is optional
export const updatePost = async (postId, title, text, image) => {
  return await db.one(
    `UPDATE posts
    SET post_title=$1,
        post_image_url=$2,
        post_text=$3
    WHERE post_id=$4
    RETURNING post_id`,
    [title, image, text, postId]
  );
};

export const updatePostTitle = async (postId, title) => {
  return await db.one(
    `UPDATE posts
    SET post_title=$1
    WHERE post_id=$2
    RETURNING post_id`,
    [title, postId]
  );
};

export const updatePostImage = async (postId, image) => {
  return await db.one(
    `UPDATE posts
    SET post_image_url=$1
    WHERE post_id=$2
    RETURNING post_id`,
    [image, postId]
  );
};

export const updatePostText = async (postId, text) => {
  return await db.one(
    `UPDATE posts
    SET post_text=$1
    WHERE post_id=$2
    RETURNING post_id`,
    [text, postId]
  );
};

export const updateComment = async (commentId, text) => {
  return await db.one(
    `UPDATE comments
    SET comment_text=$1
    WHERE comment_id=$2
    RETURNING comment_id`,
    [text, commentId]
  );
};

export const deletePost = async (postId) => {
  return await db.one(
    `DELETE FROM posts
    WHERE post_id=$1
    RETURNING post_id`,
    [postId]
  );
};

export const deleteComment = async (commentId) => {
  return await db.one(
    `DELETE FROM comments
    WHERE comment_id=$1
    RETURNING comment_id`,
    [commentId]
  );
};
