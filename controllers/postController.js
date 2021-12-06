// these functions call the respective service function which queries the database, then a response is sent back

//get a post
export const getPost = async (req, res) => {
  try {
    const gotPost = await postService.getPost(req);

    res.status(200).json({
      status: "success",
      posts: gotPost.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
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
