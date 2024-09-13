import { Swiper, SwiperSlide } from "swiper/react";
import PagesHeader from "../../components/pagesHeader/PagesHeader";
import ProductCard from "../../components/product-components/productCard/ProductCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../../../common/api/productApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";

const BestProducts = () => {
  const { data: bestSellingProducts, isLoading } = useQuery({
    queryKey: ["bestSellingProducts"],
    queryFn: fetchBestSellingProducts,
  });

  return (
    <section className="flex flex-col gap-20 max-2xl:gap-10">
      <PagesHeader
        subHeading="This Month"
        Heading="Best Selling Products"
        cta="/products"
      />

      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        className="mySwiper w-full"
        modules={[Navigation]}
        navigation={{
          enabled: true,
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        // onNavigationNext={handleNext}
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
      >
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          <>
            {bestSellingProducts?.map((bestProductCard: any) => (
              <SwiperSlide key={`bestproduct-${uuidv4()}`} className="">
                <ProductCard {...bestProductCard} />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </section>
  );
};

export default BestProducts;
