import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";

export const fetchCategories = async () => {
	return handleRequest(
    () => Axios.get("/category").then((res) => res.data.data),
    "Error fetching categories",
  );
};

export const fetchProductByCategory = async (categoryId: number) => {
	return handleRequest(
		() => Axios.get(`/product/category/${categoryId}`).then((res) => res.data),
		`Error fetching products by category ${categoryId}`,
	);
};
