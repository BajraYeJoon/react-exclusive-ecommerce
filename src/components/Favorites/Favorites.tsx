import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";
import { deleteAllFavorites, fetchFavorites } from "../../api/fetch";
import { Button } from "../ui/button";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resultfav = await fetchFavorites();
        setFavorites(resultfav.data);
      } catch (error) {
        console.error("An error occurred while fetching favorites:", error);
      }
    })();
  }, []);

  console.log(favorites);

  const DeleteAllFavorites = async () => {
    try {
      const resultafterdelete = await deleteAllFavorites();
      console.log(resultafterdelete);
      if (resultafterdelete) {
        setFavorites([]);
      } else {
        throw new Error("Failed to delete all favorites");
      }
    } catch (error) {
      console.error("An error occurred while deleting all favorites:", error);
    }
  };

  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <div className="flex items-center justify-between">
        <CustomBreakcrumb
          breadcrumbTitle="Favorites"
          breadcrumbValue={favorites as []}
        />
        <Button onClick={DeleteAllFavorites}>Clear All</Button>
      </div>

      {favorites.length === 0 ? (
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
          {favorites.map((favProduct: any) => (
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