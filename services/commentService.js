//select xth set of newest comments in any category where x is count
export const selectNewestComments = async (req) => {
  try {
    const result = await query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY create_date DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const selectStarredComments = async (req) => {
  try {
    const result = await query(
      "SELECT * FROM comments WHERE post_id=$1 ORDER BY stars DESC LIMIT 10 OFFSET $2",
      [req.params.post_id, 10 * req.params.count]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const selectComment = async (req) => {
  try {
    const result = await query(
      "SELECT * FROM comments WHERE (comment_id=$1)",
      [req.params.comment_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const insertComment = async (req) => {
  try {
    const result = await query(
      "INSERT INTO comments WHERE (post_id=$1) (user_id, comment_text) VALUES ($2, $3) RETURNING *",
      [
        req.params.post_id,
        req.body.user_id,
        req.body.comment_text,
      ]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req) => {
  try {
    const result = await query(
      "DELETE FROM comments WHERE (comment_id=$1) returning *",
      [req.params.comment_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateCommentText = async (req) => {
  try {
    const result = await query(
      "UPDATE comments SET (comment_text=$1) WHERE (comment_id=$2) RETURNING *",
      [
        req.body.comment_text,
        req.params.comment_id,
      ]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateCommentStar = async (req) => {
  try {
    const result = await query(
      "UPDATE comments SET (stars=$1) WHERE (comment_id=$2) RETURNING *",
      [req.body.stars, req.params.comment_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
