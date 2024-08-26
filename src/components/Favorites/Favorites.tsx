import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";
import { deleteAllFavorites, fetchFavorites } from "../../api/wishlistApi";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "../../lib/reactQueryClient";
import { FaSpinner } from "react-icons/fa";

const Favorites = () => {
  const { data: favoritesData, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });

  const deleteAll = useMutation({
    mutationFn: deleteAllFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Favorites cleared");
    },
    onError: (error) => {
      console.error("Error deleting favorites:", error);
    },
  });

  if (isLoading)
    return (
      <div
        aria-label="Loading..."
        role="status"
        className="flex h-screen w-full items-center justify-center space-x-2"
      >
        <FaSpinner className="h-20 w-20 animate-spin stroke-gray-500" />
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
    );

  const DeleteAllFavorites = () => {
    deleteAll.mutate();
  };

  const favorites = favoritesData?.data || [];
  console.log(favorites);

  return (
    <section className="relative mx-8 my-6 h-[40vh] md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
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
