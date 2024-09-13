import { Link } from "react-router-dom";
import ProductCard from "../product-components/productCard/ProductCard";
import CustomBreakcrumb from "../customBreakcrumb/CustomBreakcrumb";
import { deleteAllFavorites, fetchFavorites } from "../../api/wishlistApi";
import { Button } from "../../../common/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loading } from "../../site";
import { useAuthContext } from "../../context/useAuthContext";

const Favorites = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();
  const { data: favoritesData, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: isLoggedIn && !isAdmin,
  });
  const queryClient = useQueryClient();
  const deleteAll = useMutation({
    mutationFn: deleteAllFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Favorites cleared");
    },
    onError: (error: any) => {
      console.error("Error deleting favorites:", error?.response?.data);
    },
  });

  if (isLoading) return <Loading />;

  const DeleteAllFavorites = () => {
    deleteAll.mutate();
  };

  const favorites = favoritesData?.data || [];

  return (
    <section className="relative mx-8 my-6 h-[40vh] md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <div className="flex items-center justify-between">
        <CustomBreakcrumb
          breadcrumbTitle="Favorites"
          breadcrumbValue={favorites as []}
        />
        {isLoggedIn && !isAdmin && (
          <Button onClick={DeleteAllFavorites}>Clear All</Button>
        )}
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
