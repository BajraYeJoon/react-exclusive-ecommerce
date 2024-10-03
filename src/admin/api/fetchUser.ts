import { Axios } from "../../common/lib/axiosInstance";
import { handleRequest } from "../../common/api/handleRequest";

export const fetchAllUsers = async () => {
	return handleRequest(
		() => Axios.get(`/profile/users`).then((res) => res.data),
		"Something went wrong fetcing the users",
	);
};
