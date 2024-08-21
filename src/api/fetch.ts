import axios from "axios";
import Cookies from "js-cookie";

const URL = "https://nest-ecommerce-1fqk.onrender.com";
const token = Cookies.get("token");

export const fetchSalesProduct = async () => {
  const data = await axios.get(`${URL}/sale`).then((res) => res.data);
  return data;
};

export const fetchCategories = async () => {
  const data = await axios.get(`${URL}/category`).then((res) => res.data.data);
  return data;
};

export const fetchAllProducts = async () => {
  const allproducts = await axios
    .get(`${URL}/product/all`)
    .then((res) => res.data);

  return allproducts;
};

export const fetchProductByCategory = async (categoryId: number) => {
  const data = await axios
    .get(`${URL}/product/category/${categoryId}`)
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
    .get(`${URL}/product/${id}`)
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
    .delete(
      `${URL}/wishlist/${id}`,
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
  const result = await axios.get(`${URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

export const deleteAllFavorites = async () => {
  const resultafterdelete = await axios.delete(`${URL}/wishlist/deleteall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resultafterdelete;
};

export const fetchUserDetails = async () => {
  const profileresult = await axios.get(`${URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return profileresult.data.user;
};

export const fetchCart = async () => {
  const cartData = await axios.get(`${URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return cartData.data.data;
};

export const deleteAllCartItems = async () => {
  const resultafterdelete = await axios.delete(
    `${URL}/cart/deleteall`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return resultafterdelete;
};

export const addProductToCart = async (id: number) => {
  const response = await axios.post(
    `${URL}/cart/add/${id}`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};


