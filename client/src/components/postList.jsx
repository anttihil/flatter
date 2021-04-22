import React from "react";
import { useEffect, useState } from "react";
import PostApi from "../apis/PostApi";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await PostApi.get(
          `/${props.category_id}/${props.sort}/1`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [props.category_id, props.sort]);

  return (
    <div>
      {posts.map((posts) => (
        <div>{posts.text}</div>
      ))}
    </div>
  );
};

export default PostList;
