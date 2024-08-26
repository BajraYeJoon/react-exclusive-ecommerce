import { Swiper, SwiperSlide } from "swiper/react";
import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
// import { bestSellingProducts } from "../../constants/data";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../site";
import { fetchBestSellingProducts } from "../../../common/api/productApi";

const BestProducts = () => {
  const { data: bestSellingProducts, isLoading } = useQuery({
    queryKey: ["bestSellingProducts"],
    queryFn: fetchBestSellingProducts,
  });

  if (isLoading) return <Loading />;

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
        {bestSellingProducts &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          bestSellingProducts.map((bestProductCard: any, index: number) => (
            <SwiperSlide key={index} className="">
              <ProductCard key={index} {...bestProductCard} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default BestProducts;
