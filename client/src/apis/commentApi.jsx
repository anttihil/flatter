import axios from "axios";

const CommentApi = axios.create({
  baseURL: "http://localhost:3001/api/comments",
});

export default CommentApi;
