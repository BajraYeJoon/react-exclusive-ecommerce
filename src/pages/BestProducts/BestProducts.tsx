import { Swiper, SwiperSlide } from "swiper/react";
import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import { bestSellingProducts } from "../../constants/data";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BestProducts = () => {
  return (
    <section className="flex flex-col gap-20 max-2xl:gap-10">
      <PagesHeader
        subHeading="This Month"
        Heading="Best Selling Products"
        cta
      />
      <div className="product-card-container flex w-full items-center justify-between gap-4 overflow-x-auto">
        <Swiper
          spaceBetween={20}
          pagination={{ clickable: true }}
          className="mySwiper"
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".arrow-right",
            prevEl: ".arrow-left",
          }}
          // onNavigationNext={handleNext}
          breakpoints={{
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
          {bestSellingProducts.map((bestProductCard, index) => (
            <SwiperSlide key={index} className="">
              <ProductCard key={index} {...bestProductCard} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestProducts;
