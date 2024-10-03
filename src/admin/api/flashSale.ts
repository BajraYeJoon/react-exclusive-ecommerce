import { handleRequest } from "./../../common/api/handleRequest";
import { Axios } from "./../../common/lib/axiosInstance";

interface FlashSalePayload {
	saleStart: string;
	saleEnd: string;
	products: number[];
}

export const getFlashSale = async () => {
	return handleRequest(
		() => Axios.get("/sale/").then((res) => res.data.data),
		"Error getting flash sales",
	);
};

export const addProductToFlashSale = async (
	payload: FlashSalePayload,
): Promise<FlashSalePayload> => {
	return handleRequest(
		() => Axios.post("/sale/additem", payload).then((res) => res.data.data),
		`Error adding products ${payload.products} to flash sales`,
	);
};

export const deleteFlashSale = async (id: number) => {
	return handleRequest(
		() => Axios.delete(`/sale/${id}`).then((res) => res.data),
		`Error deleting flash sale ${id}`,
	);
};
