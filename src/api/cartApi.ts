import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";

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
    () => Axios.post(`/cart/add/${id}`).then((res) => res.data),
    `Error adding product ${id} to cart`,
  );
};
