import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "sonner";

const token = Cookies.get("token");

export const Axios = axios.create({
  baseURL: "https://nest-ecommerce-1fqk.onrender.com",
  // baseURL: "http://192.168.88.45:3000",

  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       Cookies.remove("token");
//       toast.error("Session expired. Please sign in again.");
//       window.location.href = "/sign-in";
//     }
//     return Promise.reject(error);
//   },
// );

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
