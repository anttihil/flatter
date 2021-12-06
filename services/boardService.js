import db from "../db/db.js";

export const getNewestPostsInAll = (req) =>
  db.tx(async (t) => {
    // `t` and `this` here are the same;
    // this.ctx = transaction config + state context;

    const boards = await t.manyOrNone(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    console.log(boards);
    const posts = await t.manyOrNone(
      `SELECT board_name, post_id, post_title, post_text, user_nickname, post_created_at 
      FROM posts p
      INNER JOIN boards b 
        ON p.board_id = b.board_id 
      INNER JOIN users s 
        ON s.user_id = p.user_id 
      ORDER BY post_created_at DESC LIMIT 100 OFFSET $1`,
      [100 * req.params.count]
    );
    console.log(posts);
    return { boards, posts };
  });

/*  */
export const getNewestPostsInBoard = async (req) =>
  db.tx(async (t) => {
    // `t` and `this` here are the same;
    // this.ctx = transaction config + state context;

    const boards = await t.manyOrNone(
      `SELECT board_name FROM boards ORDER BY board_name ASC`
    );
    const posts = await t.manyOrNone(
      `SELECT board_name, post_id, post_title, post_text, user_nickname, post_created_at 
        FROM posts p
        INNER JOIN boards b 
            ON p.board_id = b.board_id 
        INNER JOIN users s 
          ON s.user_id = p.user_id
        WHERE board_name = $1 
        ORDER BY post_created_at DESC LIMIT 100 OFFSET $2`,
      [req.params.board_name, 100 * req.params.count]
    );
    return { boards, posts };
  });
