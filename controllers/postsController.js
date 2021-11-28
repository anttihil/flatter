const postsService = require("../services/postsService");

// these functions call the respective service function which queries the database, then a response is sent back

//get xth set of newest posts in any category where x is count
exports.getNewestPostsController = async (req, res) => {
  try {
    const gotNewestPosts = await postsService.getNewestPosts(req);
    res.status(200).json({
      status: "success",
      posts: gotNewestPosts.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//get xth set of most starred comments where x is count
exports.getStarredPostsController = async (req, res) => {
  try {
    const gotStarredPosts = await postsService.getStarredPosts(req);
    res.status(200).json({
      status: "success",
      posts: gotStarredPosts.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//get a post
exports.getPostController = async (req, res) => {
  try {
    const gotPost = await postsService.getPost(req);
    res.status(200).json({
      status: "success",
      posts: gotPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//create a post
exports.postPostController = async (req, res) => {
  try {
    const postedPost = await postsService.postPost(req);
    res.status(201).json({
      status: "success",
      posts: postedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//delete a post with id
exports.deletePostController = async (req, res) => {
  try {
    const deletedPost = await postsService.deletePost(req);
    res.status(200).json({
      status: "success",
      posts: deletedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update a post (category, text or stars)
exports.updatePostController = async (req, res) => {
  try {
    const updatedPost = await postsService.updatePost(req);
    res.status(200).json({
      status: "success",
      posts: updatedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update stars in a post ("upvote")
exports.upvotePostController = async (req, res) => {
  try {
    const upvotedPost = await postsService.upvotePost(req);
    res.status(200).json({
      status: "success",
      posts: upvotedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
