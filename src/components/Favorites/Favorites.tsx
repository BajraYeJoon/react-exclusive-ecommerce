import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";
import { fetchFavorites } from "../../api/fetch";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resultfav = await fetchFavorites();
        setFavorites(resultfav);
      } catch (error) {
        console.error("An error occurred while fetching favorites:", error);
      }
    })();
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
        <div className="product-card-container flex flex-wrap items-center justify-center gap-4 overflow-hidden lg:justify-start">
          {favorites.data?.map((favProduct: any) => (
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