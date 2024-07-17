import axios from "axios";

const URL = "https://fakestoreapi.com";
export const fetchProducts = async () => {
  const data = await axios.get(`${URL}/products`).then((res) => res.data);
  return data;
};

export const fetchCategories = async () => {
  const data = await axios
    .get(`${URL}/products/categories`)
    .then((res) => res.data);
  return data;
};
