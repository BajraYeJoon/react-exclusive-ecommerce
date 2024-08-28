import { handleRequest } from "../../common/api/handleRequest";
import { Axios } from "../../common/lib/axiosInstance";

export const fetchCart = async () => {
  return handleRequest(
    () => Axios.get(`/cart`).then((res) => res.data.data),
    "Error fetching cart",
  );
};

export const deleteAllCartItems = async () => {
  return handleRequest(
    () => Axios.delete(`/cart/deleteall`).then((res) => res.data),
    "Error deleting all cart items",
  );
};

export const addProductToCart = async (id: number) => {
  return handleRequest(
    () => Axios.post(`/cart/${id}/?type=add`, { id }).then((res) => res.data),
    `Error adding product ${id} to cart`,
  );
};

export const deleteProductFromCart = async (id: number) => {
  return handleRequest(
    () => Axios.delete(`/cart/delete/${id}/`).then((res) => res.data),
    `Error deleting product ${id} from cart`,
  );
};