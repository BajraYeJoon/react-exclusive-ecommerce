import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";

export const fetchUserDetails = async () => {
  return handleRequest(
    () => Axios.get(`/profile`).then((res) => res.data.user),
    "Error fetching user details",
  );
};
