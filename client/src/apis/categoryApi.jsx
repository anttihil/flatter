import axios from "axios";

const CategoryApi = axios.create({
  baseURL: "http://localhost:3001/api/categories",
});

export default CategoryApi;
