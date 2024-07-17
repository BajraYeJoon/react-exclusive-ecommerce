import { EyeIcon, HeartIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  price: number;
  discountPrice: number;
  rating: number;
  image: string;
  discountTag?: boolean;
}

const ProductCard = ({
  title,
  price,
  discountPrice,
  rating,
  image,
  discountTag,
}: ProductCardProps) => {
  return (
    <div className="w-full max-w-72 ">
      <div className="bg-card group rounded-b-md h-32 md:h-56 w-full relative overflow-hidden">
        <img
          className="object-contain p-4 md:p-12 h-full w-full group-hover:opacity-40 transition-opacity duration-300"
          src={image}
          alt="product image"
        />
        {discountTag && (
          <span className="text-[10px] font-light absolute top-2 left-2 px-2 py-1 text-background bg-primary rounded-sm">
            -{Math.round(((price - discountPrice) / price) * 100)}%
          </span>
        )}

        <div className="absolute right-4 top-4 flex gap-2 flex-col">
          <span className="h-7 w-7 bg-foreground/20 rounded-full flex justify-center items-center">
            <HeartIcon size={18} />
          </span>
          <span className="h-7 w-7 bg-foreground/20 rounded-full flex justify-center items-center">
            <EyeIcon size={18} />
          </span>
        </div>

        <div className="group cursor-pointer ">
          <div className="absolute bottom-0 left-0 bg-foreground w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-center py-2 text-sm font-normal tracking-tight text-background ">
              Add to Cart
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 space-y-3 pb-5">
        <h5 className="text-xs font-semibold tracking-tight text-foreground/80">
          {title}
        </h5>

        <div className="flex text-sm font-medium  items-center justify-start gap-3">
          <span className="text-primary ">${discountPrice}</span>
          <span className="line-through text-foreground/40">${price}</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="flex items-center space-x-1 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} className="text-accent md:h-8" />
            ))}
          </div>
          <span className="ml-2 text-foreground/70">({rating})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
