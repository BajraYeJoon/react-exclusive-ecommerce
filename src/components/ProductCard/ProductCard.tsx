import { EyeIcon, HeartIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { favoriteState } from "../../atoms/favoriteState";
// import Cookies from "js-cookie";
import useWindow from "../../lib/useWindow";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import axios from "axios";
import Cookies from "js-cookie";

interface ProductCardProps {
  title: string;
  price: number;
  // rating?: number;
  image: string;
  discountTag?: boolean;
  id: number;
}

const ProductCard = ({
  title,
  price,
  // rating,
  image,
  discountTag,
  id,
}: ProductCardProps) => {
  const [favorites, setFavorites] = useRecoilState(favoriteState);
  const { dimension } = useWindow();
  const { handleAddToCart } = useCart();

  const handleFavorite = async () => {
    // const isFavorite = favorites.some((item) => item.id === id);
    const token = Cookies.get("token"); // Retrieve the token from cookies

    try {
      const response = await axios.post(
        `https://nest-ecommerce-1fqk.onrender.com/wishlist/add/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to add to favorites");
      }

      setFavorites((currentFavorites) => [...currentFavorites, { id }]);
      toast.success(`Your ${title} has been added to favorites`);
    } catch (error) {
      toast.error("An error occurred while updating favorites");
    }
  };

  console.log(favorites);

  const addToCart = () => {
    const newProduct = { title, price, image, id };
    handleAddToCart(newProduct);
  };

  return (
    <div className="w-full max-w-72">
      <div className="group relative h-32 w-full overflow-hidden rounded-b-md bg-card md:h-56">
        <img
          className="h-full w-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-40 md:p-8 lg:p-12"
          src={image}
          alt="product image"
        />
        {discountTag && (
          <span className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-[10px] font-light text-background">
            {Math.round(((price - 50) / price) * 100)}%
          </span>
        )}

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <span
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
            onClick={() => handleFavorite()}
          >
            {favorites.some((item) => item.id === id) ? (
              <HeartIcon
                size={dimension.width < 768 ? 10 : 18}
                fill="red"
                className="text-primary"
              />
            ) : (
              <HeartIcon size={dimension.width < 768 ? 10 : 18} />
            )}
          </span>
          <Link
            to={`product/${id}`}
            replace={true}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/20 lg:h-7 lg:w-7"
          >
            <EyeIcon size={dimension.width < 768 ? 10 : 18} />
          </Link>
        </div>

        <div className="group cursor-pointer" onClick={addToCart}>
          <div className="absolute bottom-0 left-0 w-full bg-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="py-2 text-center text-sm font-normal tracking-tight text-background">
              Add to Cart
            </p>
          </div>
        </div>
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
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} className="text-accent md:h-8" />
            ))}
          </div>
          {/* <span className="ml-2 text-foreground/70">{rating}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
