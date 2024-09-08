import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";

export const fetchHeroBanner = async () => {
  return handleRequest(
    () => Axios.get(`/banner/items`).then((res) => res.data),
    "Error fetching hero banner",
  );
};
