import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../api/productApi";
import { Link } from "react-router-dom";
import { Loading } from "../../../../user-portal/site";

interface BrandSwiperProps {
  brandName: string;
  slideDelay: number;
}

interface ProductProps {
  id: number;
  name: string;
  title: string;
  price: number;
  image: string[];
  brand: string;
}

const BrandsDisplay = ({ brandName, slideDelay }: BrandSwiperProps) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const brandProducts = products?.filter(
    (product: ProductProps) => product.brand === brandName,
  );

  if (isLoading) return <Loading />;

  return (
    <div className="h-full w-full cursor-pointer">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: slideDelay,
          // disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        className="mySwiper h-full"
        modules={[Autoplay, Navigation]}
      >
        {brandProducts?.map((product: ProductProps) => (
          <SwiperSlide
            key={product.id}
            className="relative flex items-center justify-center"
          >
            <Link to={`/${product?.title}/${product?.id}`}>
              <img
                src={product?.image[0]}
                alt={product?.name}
                className="h-full w-full scale-100 object-cover object-center"
              />
              <div className="absolute bottom-4 left-0 z-20 px-4 text-white">
                <h3 className="text-xl">{product?.title}</h3>
                <span className="text-gray-300">${product?.price}</span>
              </div>
            </Link>

            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-gray-600 to-transparent opacity-55"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandsDisplay;
