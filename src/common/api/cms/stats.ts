import { Axios } from "../../lib/axiosInstance";
import { handleRequest } from "../handleRequest";

export const fetchStats = async () => {
	return handleRequest(
		() => Axios.get("/statistics"),
		"Failed to fetch about page",
	);
};

export const addStats = async (data: any) => {
	return handleRequest(
		() => Axios.post("/statistics", data),
		"Failed to add about page",
	);
};

export const updateStats = async (data: any) => {
	return handleRequest(
		() => Axios.patch(`/statistics/${data.id}`, data),
		"Failed to update stat",
	);
};

export const deleteStats = async (id: number) => {
	return handleRequest(
		() => Axios.delete(`/statistics/${id}`),
		"Failed to update about page",
	);
};
