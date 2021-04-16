import axios from "axios";

const PostApi = axios.create({
  baseURL: "http://localhost:3001/api/posts",
});

export default PostApi;
