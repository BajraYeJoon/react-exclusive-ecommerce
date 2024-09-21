import { toast } from "sonner";
import { Link } from "react-router-dom";
import { EyeIcon, HeartIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import useWindow from "../../../../common/lib/useWindow";
import {
  addFavorites,
  deleteFavorites,
  fetchFavorites,
} from "../../../api/wishlistApi";
import { useAuthContext } from "../../../context/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../../common/ui/button";
import uuidv4 from "../../../../common/lib/utils/uuid";
import { useIncreaseQuantity } from "../../../utils/cartutils";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  discountTag?: boolean;
  id: number;
  discountprice: number;
}

const ProductCard = ({
  title,
  price,
  image,
  discountTag,
  id,
  discountprice,
}: ProductCardProps) => {
  const { dimension } = useWindow();
  const { isLoggedIn, isAdmin } = useAuthContext();
  const queryClient = useQueryClient();

  const { data: favoritesData } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !isAdmin && isLoggedIn,
  });
  const favorites = favoritesData?.data || [];

  const mutation = useMutation({
    mutationFn: deleteFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(`Your ${title} has been removed from favorites`);
    },
    onError: () => {
      toast.error("An error occurred while updating favorites");
    },
  });
  const mutationAdd = useMutation({
    mutationFn: addFavorites,
    onSuccess: (response) => {
      if (response) {
        toast.success(`Your ${title} has been added to favorites`);
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      } else {
        throw new Error("Failed to add to favorites");
      }
    },
    onError: () => {
      toast.error("An error occurred while updating favorites");
    },
  });

  const handleRemoveFavorite = async () => {
    mutation.mutate(id);
  };

  const handleAddFavorite = async () => {
    mutationAdd.mutate(id);
  };

  const isFavorite = (id: number) => {
    return (
      // Array.isArray(favorites.data) &&
      favorites.some((item: { id: number }) => item.id === id)
    );
  };

  const { mutate: addToCart } = useIncreaseQuantity();

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add to favorites");
      return;
    }
    isFavorite(id) ? handleRemoveFavorite() : handleAddFavorite();
  };

  return (
    <section className="mt-4 w-full max-w-72">
      <div className="group relative h-32 w-full overflow-hidden rounded-b-md bg-card md:h-56">
        <Link to={`/${title?.toLowerCase().split(" ").join("-")}/${id}`}>
          <img
            className="h-full w-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-40 md:p-8 lg:p-8"
            src={
              image && image[0] ? image[0] : "https://via.placeholder.com/150"
            }
            alt={title}
            loading="lazy"
          />
        </Link>

        {discountTag && (
          <span className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-[10px] font-light text-background">
            {Math.round(((price - 50) / price) * 100)}%
          </span>
        )}

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {!isAdmin && (
            <button
              className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
              onClick={handleFavoriteClick}
            >
              <HeartIcon
                size={dimension.width < 768 ? 12 : 18}
                fill={isFavorite(id) ? "red" : "none"}
                className={isFavorite(id) ? "text-primary" : ""}
              />
            </button>
          )}

          <Link
            to={`/product/${id}`}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
          >
            <EyeIcon size={dimension.width < 768 ? 12 : 18} />
          </Link>
        </div>

        {!isAdmin && (
          <Button
            className="group cursor-pointer"
            onClick={() => addToCart({ id: id, type: "add" })}
          >
            <div className="absolute bottom-0 left-0 w-full bg-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="py-2 text-center text-sm font-normal tracking-tight text-background">
                Add to Cart
              </p>
            </div>
          </Button>
        )}
      </div>

      <div className="my-4 space-y-2">
        <h5 className="text-wrap text-sm font-semibold tracking-wide text-foreground/80 md:text-base">
          {title.slice(0, 20)}
        </h5>

        <div className="flex items-center justify-start gap-3 font-medium">
          <span className="text-base text-primary">${price}</span>
          {discountprice && (
            <span className="text-foreground/40 line-through">
              {discountprice}
            </span>
          )}
        </div>
        <div className="flex items-center text-xs">
          {Array.from({ length: 5 }).map(() => (
            <FaStar
              key={`star-${uuidv4()}`}
              className="mr-0.5 text-accent md:h-8"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
