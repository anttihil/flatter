import axios from "axios";

const commentApi = axios.create({
  baseURL: "http://localhost:3001/api/comments",
});

export default commentApi;