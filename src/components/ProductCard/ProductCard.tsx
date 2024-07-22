import { EyeIcon, HeartIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartState";
import { toast } from "sonner";
import { CartItem } from "../../atoms/cartState";

interface ProductCardProps {
  title: string;
  price: number;
  // discountPrice: number;
  rating: { count: number };
  image: string;
  discountTag?: boolean;
  index: number;
}

const ProductCard = ({
  title,
  price,
  // discountPrice,
  rating,
  image,
  discountTag,
  // index,
}: ProductCardProps) => {
  const [, setCart] = useRecoilState(cartState);

  const handleAddToCart = () => {
    const newProduct: Omit<CartItem, "quantity"> = {
      title,
      price,
      image,
      id: 0,
    }; // Assuming these are the properties you want to include
    setCart((currentCart) => {
      const productIndex = currentCart.findIndex(
        (item) => item.title === title,
      );
      if (productIndex !== -1) {
        return currentCart.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...currentCart, { ...newProduct, quantity: 1 }];
      }
    });
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
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/20">
            <HeartIcon size={18} />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/20">
            <EyeIcon size={18} />
          </span>
        </div>

        <div className="group cursor-pointer" onClick={handleAddToCart}>
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
          <span className="ml-2 text-foreground/70">({rating?.count})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
