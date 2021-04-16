import axios from "axios";

const UserApi = axios.create({
  baseURL: "http://localhost:3001/api/users",
});

export default UserApi;
