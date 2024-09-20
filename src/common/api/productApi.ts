import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";

export const fetchSalesProduct = async () => {
  return handleRequest(
    () => Axios.get(`/sale`).then((res) => res.data.data),
    "Error fetching sales product",
  );
};

export const fetchAllProducts = async () => {
  return handleRequest(
    () => Axios.get(`/product/all`).then((res) => res.data),
    "Error fetching all products",
  );
};

export const fetchNewArrivals = async () => {
  return handleRequest(
    () => Axios.get(`/product/newarrival`).then((res) => res.data),
    "Error fetching new arrivals",
  );
};

export const fetchProductsBySearch = async (search: string) => {
  return handleRequest(
    () =>
      Axios.get(`/product?q=${search}`).then((res) => res.data.results || []),
    `Error fetching products by search "${search}"`,
  );
};

export const fetchBestSellingProducts = async () => {
  return handleRequest(
    () => Axios.get(`/product/bestselling`).then((res) => res.data.data),
    "Error fetching best selling products",
  );
};

export const fetchProductDetails = async (id: string) => {
  return handleRequest(
    () => Axios.get(`/product/${id}`).then((res) => res.data.data),
    `Error fetching product details for ID ${id}`,
  );
};
