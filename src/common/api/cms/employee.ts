import { Axios } from "../../lib/axiosInstance";
import { handleRequest } from "../handleRequest";

export const fetchEmployees = async () => {
	return handleRequest(
		() => Axios.get("/employee"),
		"Failed to fetch employees",
	);
};

export const addEmployee = async (data: FormData) => {
	return handleRequest(
		() => Axios.post("/employee", data),
		"Failed to add employee",
	);
};

export const updateEmployee = async ({
	id,
	data,
}: {
	id: string;
	data: FormData;
}) => {
	return handleRequest(
		() => Axios.patch(`/employee/${id}`, data),
		"Failed to update employee",
	);
};

export const deleteEmployee = async (id: string) => {
	return handleRequest(
		() => Axios.delete(`/employee/${id}`),
		"Failed to delete employee",
	);
};
