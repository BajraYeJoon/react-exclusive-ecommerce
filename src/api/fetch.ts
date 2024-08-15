import axios from "axios";
import Cookies from "js-cookie";

const URL = "https://nest-ecommerce-1fqk.onrender.com";
const token = Cookies.get("token");
export const fetchProducts = async () => {
  const data = await axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) => res.data);
  return data;
};

export const fetchCategories = async () => {
  const data = await axios
    .get(`${URL}/category/getcategories`)
    .then((res) => res.data.data);
  return data;
};

export const fetchAllProducts = async () => {
  const allproducts = await axios
    .get(`${URL}/product/allproducts`)
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

export const fetchProductsBySearch = async (search: string) => {
  const result = await axios
    .get(`${URL}/product/searchItem?q=${search}`)
    .then((res) => res.data.results || []);
  return result;
};

export const fetchProductDetails = async (id: string) => {
  const result = await axios
    .get(`${URL}/product/productdetail/${id}`)
    .then((res) => res.data.data);
  return result;
};

export const addFavorites = async (id: number) => {
  const addedresult = await axios
    .post(
      `${URL}/wishlist/add/${id}`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data);
  return addedresult;
};

export const deleteFavorites = async (id: number) => {
  const deletedresult = await axios
    .post(
      `${URL}/wishlist/delete/${id}`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data);
  return deletedresult;
};

export const fetchFavorites = async () => {
  const result = await axios.get(`${URL}/wishlist/mylist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

export const fetchUserDetails = async () => {
  const profileresult = await axios.get(`${URL}/profile/myprofile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return profileresult.data.user;
};

export const fetchCart = async () => {
  const cartData = await axios.get(`${URL}/cart/mycart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return cartData.data.data;
};