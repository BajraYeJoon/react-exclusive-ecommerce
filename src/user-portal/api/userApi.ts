import { handleRequest } from "../../common/api/handleRequest";
import { Axios } from "../../common/lib/axiosInstance";

export const fetchUserDetails = async () => {
	return handleRequest(
    () => Axios.get("/profile").then((res) => res.data.user),
    "Error fetching user details",
  );
};

export const updateUserDetails = async (data: any) => {
	return handleRequest(
    () => Axios.patch("/profile/updateprofile", data).then((res) => res.data),
    "Error updating user details",
  );
};
