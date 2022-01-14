import db from "../config/db.js";

/* 
Naming conventions for database services:
Creating a resource: insertX
Reading a resource: selectY
Update a resource: updateZ
Deleting a resource: deleteW
*/

export const deletePost = async (postId) => {
  return await db.one(
    `DELETE FROM posts
    WHERE id=$1
    RETURNING id`,
    [postId],
    (a) => a.id.toString()
  );
};

export const deleteComment = async (commentId) => {
  return await db.one(
    `DELETE FROM comments
    WHERE id=$1
    RETURNING id`,
    [commentId],
    (a) => a.id.toString()
  );
};

// referenceId is an optional parameter
export const insertComment = async (userId, postId, text, referenceId) => {
  return await db.one(
    `INSERT INTO comments(user_id, post_id, text, reference_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
    [userId, postId, text, referenceId],
    (a) => a.id.toString()
  );
};

// image is an optional parameter
export const insertPost = async (boardName, userId, title, text, image) => {
  return db.tx(async (t) => {
    const result1 = await t.one(
      `SELECT id
      FROM boards
      WHERE name=$1`,
      [boardName],
      (a) => a.id
    );
    const result2 = await t.one(
      `INSERT INTO posts(user_id, board_id, title, text, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [userId, result1, title, text, image],
      (a) => a.id.toString()
    );
    return result2;
  });
};

export const selectBoards = async () => {
  return await db.any("SELECT name FROM boards ORDER BY name ASC");
};

export async function selectCommentOwner(commentId) {
  return await db.oneOrNone(
    `SELECT user_id FROM comments WHERE id=$1`,
    [commentId],
    (a) => a && a.user_id.toString()
  );
}

export const selectPostandComments = async (postId) =>
  // tx is a postgreSQL transaction which contains many queries.
  // We use many queries in one transaction for a performance boost.
  db.tx(async (t) => {
    const post = await t.oneOrNone(
      `SELECT p.id, p.title, p.text, p.user_id, u.username, p.created_at, p.last_changed_at
        FROM posts p
        INNER JOIN users u 
          ON u.id = p.user_id
        WHERE p.id = $1`,
      [postId]
    );
    const comments = await t.any(
      `SELECT c.id, c.text, c.user_id, u.username, c.created_at, c.last_changed_at, c.reference_id, s.username as reference_author
        FROM comments c
        LEFT JOIN comments r
          ON c.reference_id = r.id
        INNER JOIN users u
          ON u.id = c.user_id
        LEFT JOIN users s
          ON s.id = r.user_id
        WHERE c.post_id = $1
        ORDER BY c.created_at ASC;`,
      [postId]
    );
    return { post, comments };
  });

export async function selectPostOwner(postId) {
  return await db.oneOrNone(
    `SELECT user_id FROM posts WHERE id=$1`,
    [postId],
    (a) => a && a.user_id.toString()
  );
}

// sort could be also active which requires that we join also comments
// if sort == "active" we can select first from comments
export async function selectPosts(boardList, page, sort) {
  const posts = await db.any(
    `SELECT b.name AS board, p.id, LEFT(p.title, 150) AS title, LEFT(p.text, 300) AS text, p.user_id as userId, u.username, p.last_changed_at, p.created_at
    FROM posts p
    INNER JOIN boards b 
      ON p.board_id = b.id 
    INNER JOIN users u 
      ON u.id = p.user_id 
    WHERE b.name IN ($1:list) 
    ORDER BY p.created_at DESC LIMIT 100 OFFSET $2`,
    [boardList, page]
  );
  return posts;
}

// image is optional
export const updatePost = async (postId, title, text, image) => {
  return await db.one(
    `UPDATE posts
    SET title=$1,
        image_url=$2,
        text=$3
    WHERE id=$4
    RETURNING id`,
    [title, image, text, postId],
    (a) => a.id.toString()
  );
};

export const updatePostImage = async (postId, image) => {
  return await db.one(
    `UPDATE posts
    SET image_url=$1
    WHERE id=$2
    RETURNING id`,
    [image, postId],
    (a) => a.id.toString()
  );
};

export const updatePostText = async (postId, text) => {
  return await db.one(
    `UPDATE posts
    SET text=$1
    WHERE id=$2
    RETURNING id`,
    [text, postId],
    (a) => a.id.toString()
  );
};

export const updatePostTitle = async (postId, title) => {
  return await db.one(
    `UPDATE posts
    SET title=$1
    WHERE id=$2
    RETURNING id`,
    [title, postId],
    (a) => a.id.toString()
  );
};

export const updateComment = async (commentId, text) => {
  return await db.one(
    `UPDATE comments
    SET text=$1
    WHERE id=$2
    RETURNING id`,
    [text, commentId],
    (a) => a.id.toString()
  );
};
