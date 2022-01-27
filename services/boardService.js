import db from "../config/db.js";
import { pgp } from "../config/db.js";
export function deletePost(postId) {
  return db.one(
    `DELETE FROM posts
    WHERE id=$1
    RETURNING id`,
    [postId],
    (a) => a.id
  );
}

export function deleteComment(commentId) {
  return db.one(
    `DELETE FROM comments
    WHERE id=$1
    RETURNING id`,
    [commentId],
    (a) => a.id
  );
}

// referenceId is an optional parameter
export function insertComment(userId, postId, text, referenceId) {
  return db.one(
    `INSERT INTO comments(user_id, post_id, text, reference_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
    [userId, postId, text, referenceId],
    (a) => a.id
  );
}
/* 
Insert helper constructs a multi-row query string that has a custom quantity of columns and values
It needs as its parameter an array of objects which keys are column names and values are row values.
[{id: X1, user_id: Y1}, {id:X2, user_id:Y2},...]
*/
export function insertImages(imageIds, userId, postId) {
  const dataObjectArr = imageIds.map((id) => {
    return { id, user_id: userId, post_id: postId };
  });
  const queryString = pgp.helpers.insert(
    dataObjectArr,
    ["id", "user_id", "post_id"],
    "images"
  );
  return db.many(queryString + "RETURNING id");
}

// image is an optional parameter
export function insertPost(boardName, userId, title, text) {
  return db.tx(async (t) => {
    const result1 = await t.one(
      `SELECT id
      FROM boards
      WHERE name=$1`,
      [boardName],
      (a) => a.id
    );
    const result2 = await t.one(
      `INSERT INTO posts(user_id, board_id, title, text)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      [userId, result1, title, text],
      (a) => a.id
    );
    return result2;
  });
}

export function selectBoards() {
  return db.any("SELECT name FROM boards ORDER BY name ASC");
}

export function selectCommentOwner(commentId) {
  return db.oneOrNone(
    `SELECT user_id FROM comments WHERE id=$1`,
    [commentId],
    (a) => a && a.user_id
  );
}

export function selectPostandComments(postId) {
  // tx is a postgreSQL transaction which contains many queries.
  // We use many queries in one transaction for a performance boost.
  return db.tx(async (t) => {
    const post = await t.oneOrNone(
      `
      SELECT 
        p.id, 
        p.title, 
        p.text, 
        p.user_id,
        p.created_at, 
        p.last_changed_at, 
        p.is_locked,
        u.username
      FROM posts p
      INNER JOIN users u 
        ON u.id = p.user_id
      WHERE p.id = $1`,
      [postId]
    );
    const images = await t.any(
      `SELECT id 
        FROM images
        WHERE post_id = $1`,
      [postId]
    );
    const comments = await t.any(
      `
      SELECT 
        c.id, 
        c.text, 
        c.user_id, 
        c.created_at, 
        c.last_changed_at, 
        c.reference_id,
        u.username, 
        s.username AS reference_author
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
    return { post, images, comments };
  });
}

export function selectPostOwner(postId) {
  return db.oneOrNone(
    `SELECT user_id FROM posts WHERE id=$1`,
    [postId],
    (a) => a && a.user_id
  );
}

// sort could be also active which requires that we join also comments
// if sort == "active" we can select first from comments
export function selectPosts(boardList, page, sort) {
  return db.any(
    `SELECT 
      p.id, 
      LEFT(p.title, 150) AS title, 
      LEFT(p.text, 150) AS text, 
      p.user_id AS userId,  
      p.last_changed_at, 
      p.created_at, 
      p.is_locked,
      u.username,
      b.name AS board, 
      array_agg(i.id) AS images 
    FROM posts AS p
    INNER JOIN boards AS b 
      ON p.board_id = b.id 
    INNER JOIN users AS u 
      ON u.id = p.user_id
    LEFT JOIN images AS i
      ON p.id = i.post_id
    WHERE b.name IN ($1:list)
    GROUP BY p.id, b.name, u.username 
    ORDER BY p.created_at DESC LIMIT 100 OFFSET $2
    `,
    [boardList, page]
  );
}

// image is optional
export function updatePost(postId, title, text) {
  return db.one(
    `UPDATE posts
    SET title=$1,
        text=$2
    WHERE id=$3
    RETURNING id`,
    [title, text, postId],
    (a) => a.id
  );
}

// image is optional
export function updatePostLock(postId) {
  return db.one(
    `UPDATE posts
    SET is_locked = NOT is_locked   
    WHERE id=$1
    RETURNING id`,
    [postId],
    (a) => a.id
  );
}

export function updatePostImage(postId, image) {
  return db.one(
    `UPDATE posts
    SET image_url=$1
    WHERE id=$2
    RETURNING id`,
    [image, postId],
    (a) => a.id
  );
}

export function updatePostText(postId, text) {
  return db.one(
    `UPDATE posts
    SET text=$1
    WHERE id=$2
    RETURNING id`,
    [text, postId],
    (a) => a.id
  );
}

export function updatePostTitle(postId, title) {
  return db.one(
    `UPDATE posts
    SET title=$1
    WHERE id=$2
    RETURNING id`,
    [title, postId],
    (a) => a.id
  );
}

export function updateComment(commentId, text) {
  return db.one(
    `UPDATE comments
    SET text=$1
    WHERE id=$2
    RETURNING id`,
    [text, commentId],
    (a) => a.id
  );
}
