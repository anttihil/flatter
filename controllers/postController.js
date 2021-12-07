import { insertPost, selectPost } from "../services/postService.js";



export const createPost = async (req, res, next) => {
  await insertPost(req)
    .then((data) => {
      res
        .status(200)
        .render("post", { boards: data.boards, posts: data.posts });
    })
    .catch((error) => {
      next(error);
    });
};

/* 

//get xth set of most starred comments where x is count
export const getStarredPosts = async (req, res) => {
  try {
    const gotStarredPosts = await postService.getStarredPosts(req);
    res.status(200).json({
      status: "success",
      posts: gotStarredPosts.rows,
    });
  } catch (error) {
    console.log(error);
  }
};



//create a post
export const createPost = async (req, res) => {
  try {
    const createdPost = await postService.postPost(req);
    res.status(201).json({
      status: "success",
      posts: createdPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//delete a post with id
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await postService.deletePost(req);
    res.status(200).json({
      status: "success",
      posts: deletedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update a post (category, text or stars)
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req);
    res.status(200).json({
      status: "success",
      posts: updatedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//update stars in a post ("upvote")
export const upvotePost = async (req, res) => {
  try {
    const upvotedPost = await postService.upvotePost(req);
    res.status(200).json({
      status: "success",
      posts: upvotedPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
 */
