import { Axios } from "../lib/axiosInstance";

export const fetchSalesProduct = async () => {
  const data = await Axios.get(`/sale`).then((res) => res.data);
  return data;
};

export const fetchCategories = async () => {
  const data = await Axios.get(`/category`).then((res) => res.data.data);
  return data;
};

export const fetchAllProducts = async () => {
  const allproducts = await Axios.get(`/product/all`).then(
    (res) => res.data.data,
  );

  return allproducts;
};

export const fetchProductByCategory = async (categoryId: number) => {
  const data = await Axios.get(`/product/category/${categoryId}`).then(
    (res) => res.data,
  );
  return data;
};

export const fetchNewArrivals = async () => {
  const newArrivalsData = await Axios.get(`/product/newarrival`).then(
    (res) => res.data,
  );
  return newArrivalsData;
};

export const fetchProductsBySearch = async (search: string) => {
  const result = await Axios.get(`/product/searchItem?q=${search}`).then(
    (res) => res.data.results || [],
  );
  return result;
};

export const fetchBestSellingProducts = async () => {
  const result = await Axios.get(`/product/bestselling`).then(
    (res) => res.data.data,
  );
  return result;
};

export const fetchProductDetails = async (id: string) => {
  const result = await Axios.get(`/product/${id}`).then((res) => res.data.data);
  return result;
};

export const addFavorites = async (id: number) => {
  const addedresult = await Axios.post(`/wishlist/add/${id}`, {
    id,
  }).then((res) => res.data);
  return addedresult;
};

export const deleteFavorites = async (id: number) => {
  const deletedresult = await Axios.delete(`/wishlist/${id}`).then(
    (res) => res.data,
  );
  return deletedresult;
};

export const fetchFavorites = async () => {
  const result = await Axios.get(`/wishlist`);

  return result.data;
};

export const deleteAllFavorites = async () => {
  const resultafterdelete = await Axios.delete(`/wishlist/deleteall`);
  return resultafterdelete;
};

export const fetchUserDetails = async () => {
  const profileresult = await Axios.get(`/profile`);
  return profileresult.data.user;
};

export const fetchCart = async () => {
  const cartData = await Axios.get(`/cart`);

  return cartData.data.data;
};

export const deleteAllCartItems = async () => {
  const resultafterdelete = await Axios.delete(`/cart/deleteall`);

  return resultafterdelete;
};

export const addProductToCart = async (id: number) => {
  const response = await Axios.post(`/cart/add/${id}`);
  return response.data;
};

export const fetchHeroBanner = async () => {
  return await Axios.get(`/banner/items`).then((res) => res.data.data);
};
