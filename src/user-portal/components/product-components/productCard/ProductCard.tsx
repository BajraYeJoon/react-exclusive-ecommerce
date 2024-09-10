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
}

const ProductCard = ({
  title,
  price,
  image,
  discountTag,
  id,
}: ProductCardProps) => {
  const { dimension } = useWindow();
  const { isLoggedIn } = useAuthContext();
  const queryClient = useQueryClient();

  const { data: favoritesData } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: isLoggedIn,
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
    <section className="mt-10 w-full max-w-72 md:mt-16">
      <div className="group relative h-32 w-full overflow-hidden rounded-b-md bg-card md:h-56">
        <Link to={`/${title?.toLowerCase().split(" ").join("-")}/${id}`}>
          <img
            className="h-full w-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-40 md:p-8 lg:p-12"
            src={image}
            alt="product image"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300")
            }
          />

          {/* <object
            data={image}
            className="flex h-full w-full items-center justify-center object-contain p-4 transition-opacity duration-300 group-hover:opacity-40 md:p-8 lg:p-12"
            aria-label="This image should exist, but alas it does not"
          >
            <MdOutlineImageNotSupported size={100} />
          </object> */}
        </Link>

        {discountTag && (
          <span className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-[10px] font-light text-background">
            {Math.round(((price - 50) / price) * 100)}%
          </span>
        )}

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
            onClick={handleFavoriteClick}
          >
            <HeartIcon
              size={dimension.width < 768 ? 10 : 18}
              fill={isFavorite(id) ? "red" : "none"}
              className={isFavorite(id) ? "text-primary" : ""}
            />
          </button>
          <Link
            to={`product/${id}`}
            replace={true}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
          >
            <EyeIcon size={dimension.width < 768 ? 10 : 18} />
          </Link>
        </div>

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
      </div>

      <div className="my-4 space-y-3 pb-5">
        <h5 className="text-xs font-semibold tracking-tight text-foreground/80">
          {title}
        </h5>

        <div className="flex items-center justify-start gap-3 text-sm font-medium">
          <span className="text-primary">${price}</span>
          <span className="text-foreground/40 line-through">100</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map(() => (
              <FaStar key={`star-${uuidv4()}`} className="text-accent md:h-8" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
