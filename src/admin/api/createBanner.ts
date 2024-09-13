import { handleRequest } from "../../common/api/handleRequest";
import { Axios } from "../../common/lib/axiosInstance";

export const createBanner = async (productId: number[]) => {
  return handleRequest(
    () => Axios.post(`/banner/additem/${productId}`).then((res) => res.data),
    "Error creating banner",
  );
};

export const deleteBanner = async (productId: number) => {
  return handleRequest(
    () => Axios.delete(`/banner/${productId}`).then((res) => res.data),
    "Error deleting banner",
  );
};
