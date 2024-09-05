import { Swiper, SwiperSlide } from "swiper/react";
import { PagesHeader, ProductCard } from "../../components";
import { Button } from "../../../common/ui/button";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../common/api/productApi";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";
import uuidv4 from "../../../common/lib/utils/uuid";
import { Link } from "react-router-dom";
const GeneralProducts = () => {
  const {
    data: generalProducts,

    isLoading,
  } = useQuery({
    queryKey: ["generalProducts"],
    queryFn: fetchAllProducts,
    select: (generalProducts) => generalProducts.slice(0, 8),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="general-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader subHeading="Our Products" Heading="Explore Our Products" />

      <div className="general-product-card-container w-full">
        <Swiper
          spaceBetween={1}
          // slidesPerView={dimension.width > 768 ? 4 : 2}
          pagination={{ clickable: true }}
          className="mySwiper"
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".arrow-right",
            prevEl: ".arrow-left",
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}

          // onNavigationNext={handleNext}
        >
          {isLoading ? (
            <ProductCardSkeleton />
          ) : (
            <>
              {generalProducts.map((gproduct: any) => (
                <SwiperSlide key={`generalproduct-${uuidv4()}`} className="">
                  <ProductCard {...gproduct} />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>

      <Button className="mx-auto w-full md:w-fit">
        <Link to={"/products"}>View All Products</Link>
      </Button>
    </section>
  );
};

export default GeneralProducts;
