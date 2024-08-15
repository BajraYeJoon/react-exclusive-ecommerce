import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProductCard from "../ProductCard/ProductCard";
import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = Cookies.get("token"); // Retrieve the token from cookies

      try {
        const response = await axios.get(
          "https://nest-ecommerce-1fqk.onrender.com/wishlist/mylist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setFavorites(response.data);
        } else {
          throw new Error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("An error occurred while fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  console.log(favorites);

  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <CustomBreakcrumb
        breadcrumbTitle="Favorites"
        breadcrumbValue={favorites as []}
      />

      {favorites.data?.length === 0 ? (
        <div className="my-12 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-semibold text-gray-400">
            No items in favorites
          </h1>
          <Link to={"/products"} className="underline">
            Add some products from here....
          </Link>
        </div>
      ) : (
        <div className="product-card-container flex w-full flex-wrap items-center justify-start gap-4 overflow-hidden">
          {favorites.data?.map((favProduct) => (
            <ProductCard
              key={favProduct.id}
              {...favProduct}
              image={favProduct.image}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;