import { Axios } from "../../lib/axiosInstance";
import { handleRequest } from "../handleRequest";

export const fetchAbout = async () => {
	return handleRequest(
		() => Axios.get("/storycontent"),
		"Failed to fetch about page",
	);
};

export const updateAbout = async (data: any) => {
	return handleRequest(
		() => Axios.patch("/storycontent", data),
		"Failed to update about page",
	);
};
