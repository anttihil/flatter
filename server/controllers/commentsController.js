const commentsService = require("../services/commentsService");

//get xth set of newest comments in any category where x is count
exports.getNewestCommentsController = async (req, res) => {
  try {
    const gotNewestComments = await commentsService.getNewestComments(req);
    res.status(200).json({
      status: "success",
      comments: gotNewestComments.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//get xth set of most starred comments where x is count
exports.getStarredCommentsController = async (req, res) => {
  try {
    const gotStarredComments = await commentsService.getStarredComments(req);
    res.status(200).json({
      status: "success",
      comments: gotStarredComments.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//get a comment
exports.getCommentController = async (req, res) => {
  try {
    const gotComment = await commentsService.getComment(req);
    res.status(200).json({
      status: "success",
      comments: gotComment.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//create a comment
exports.postCommentController = async (req, res) => {
  try {
    const postedComment = await commentsService.postComment(req);
    res.status(201).json({
      status: "success",
      comments: postedComment.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//delete a comment with id
exports.deleteCommentController = async (req, res) => {
  try {
    const deletedComment = await commentsService.deleteComment(req);
    res.status(200).json({
      status: "success",
      comments: deletedComment.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update a comment (category, text or stars)
exports.updateCommentController = async (req, res) => {
  try {
    const updatedComment = await commentsService.updateComment(req);
    res.status(200).json({
      status: "success",
      comments: updatedComment.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update stars in a comment ("upvote")
exports.upvoteCommentController = async (req, res) => {
  try {
    const upvotedComment = await commentsService.upvoteComment(req);
    res.status(200).json({
      status: "success",
      comments: upvotedComment.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
