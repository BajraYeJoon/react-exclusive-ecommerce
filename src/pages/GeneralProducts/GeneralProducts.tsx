import { Swiper, SwiperSlide } from "swiper/react";
import { PagesHeader, Button, ProductCard } from "../../components";
// import { generalProducts } from "../../constants/data";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "react-query";
import { fetchAllProducts } from "../../api/fetch";
import { Loading } from "../../site";
const GeneralProducts = () => {
  const {
    data: generalProducts,

    isLoading,
  } = useQuery(["generalProducts"], fetchAllProducts, {
    select: (generalProducts) => generalProducts.slice(0, 8),
    staleTime: 10000,
  });

  if (isLoading) return <Loading />;
  // if (error)
  //   return <div>error from general products: {(error as Error).message}</div>;

  console.log(generalProducts, "generalProducts");
  console.log("hi thrererererererer");

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
          {generalProducts.map((gproduct, index) => (
            <SwiperSlide key={index} className="">
              <ProductCard key={index} {...gproduct} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default GeneralProducts;
