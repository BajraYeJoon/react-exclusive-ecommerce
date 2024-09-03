import { handleRequest } from "./../../common/api/handleRequest";
import { Axios } from "./../../common/lib/axiosInstance";

interface FlashSalePayload {
  saleStart: string;
  saleEnd: string;
  products: number[];
}

export const addProductToFlashSale = async (payload: FlashSalePayload) => {
  return handleRequest(
    () => Axios.post("/sale/additem", payload).then((res) => res.data),
    `Error adding products ${payload.products} to flash sales`,
  );
};
