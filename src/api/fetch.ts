import axios from "axios";

const URL = "https://nest-ecommerce-1fqk.onrender.com";
export const fetchProducts = async () => {
  const data = await axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) => res.data);
  return data;
};

export const fetchCategories = async () => {
  const data = await axios
    .get("https://dummyjson.com/products/categories")
    .then((res) => res.data);
  return data;
};

export const fetchAllProducts = async () => {
  const allproducts = await axios
    .get("https://dummyjson.com/products")
    .then((res) => res.data);

  return allproducts;
};

export const fetchProductByCategory = async (category: string) => {
  const data = await axios
    .get(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.data);
  return data;
};

export const fetchNewArrivals = async () => {
  const newArrivalsData = await axios
    .get(`${URL}/product/newarrival`)
    .then((res) => res.data);
  return newArrivalsData;
};
