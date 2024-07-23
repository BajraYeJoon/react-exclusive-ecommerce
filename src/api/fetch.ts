import axios from "axios";

const URL = "https://fakestoreapi.com";
export const fetchProducts = async () => {
  const data = await axios.get(`${URL}/products`).then((res) => res.data);
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
