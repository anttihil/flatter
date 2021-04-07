import axios from "axios";

const categoryApi = axios.create({
  baseURL: "http://localhost:3001/api/categories",
});

export default categoryApi;
