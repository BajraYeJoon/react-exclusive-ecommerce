import { handleRequest } from "../../common/api/handleRequest";
import { Axios } from "../../common/lib/axiosInstance";

export interface BannerResponse {
	productId: number[];
}
export const createBanner = async (
	productId: number[],
): Promise<BannerResponse> => {
	return handleRequest(
		() => Axios.post(`/banner/additem/${productId}`).then((res) => res.data),
		"Error creating banner",
	);
};

export const deleteBanner = async (productId: number): Promise<void> => {
	return handleRequest(
		() => Axios.delete(`/banner/${productId}`).then((res) => res.data),
		"Error deleting banner",
	);
};
