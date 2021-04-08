import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3001/api/users",
});

export default userApi;
