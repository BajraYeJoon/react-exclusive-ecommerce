import { handleRequest } from "../../common/api/handleRequest";
import { Axios } from "../../common/lib/axiosInstance";

export const addFavorites = async (id: number) => {
	return handleRequest(
		() => Axios.post(`/wishlist/add/${id}`, { id }).then((res) => res.data),
		`Error adding product ${id} to favorites`,
	);
};

export const deleteFavorites = async (id: number) => {
	return handleRequest(
		() => Axios.delete(`/wishlist/${id}`).then((res) => res.data),
		`Error deleting product ${id} from favorites`,
	);
};

export const fetchFavorites = async () => {
	return handleRequest(
    () => Axios.get("/wishlist").then((res) => res.data),
    "Error fetching favorites",
  );
};

export const deleteAllFavorites = async () => {
	return handleRequest(
    () => Axios.delete("/wishlist/deleteall").then((res) => res.data),
    "Error deleting all favorites",
  );
};
