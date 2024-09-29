import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const baseURL = "https://nest-ecommerce-1fqk.onrender.com";

export const Axios = axios.create({ baseURL });

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(`${baseURL}/auth/token-refresh`, {
          withCredentials: true 
        });

        const newAccessToken = response.data.access_token;
        if (newAccessToken) {
          Cookies.set("access_token", newAccessToken);
          Axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return Axios(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        toast.error("Session expired. Please sign in again.");
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);