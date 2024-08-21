import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";
import { deleteAllFavorites, fetchFavorites } from "../../api/fetch";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { queryClient } from "../../lib/reactQueryClient";

const Favorites = () => {
  const { data: favoritesData, isLoading } = useQuery(
    "favorites",
    fetchFavorites,
  );

  const deleteAll = useMutation(deleteAllFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
      toast.success("Favorites cleared");
    },
    onError: (error) => {
      console.error("Error deleting favorites:", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const DeleteAllFavorites = () => {
    deleteAll.mutate();
  };

  const favorites = favoritesData?.data || [];
  console.log(favorites);

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
