import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const Axios = axios.create({
  baseURL: "https://nest-ecommerce-1fqk.onrender.com",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});
