import { Swiper, SwiperSlide } from "swiper/react";
import { PagesHeader, Button, ProductCard } from "../../components";
// import { generalProducts } from "../../constants/data";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "react-query";
import { fetchAllProducts } from "../../api/fetch";
import { Loading } from "../../site";
const GeneralProducts = () => {
  const {
    data: generalProducts,
    error,
    isLoading,
  } = useQuery(["products"], fetchAllProducts, {
    select: (products) => products.slice(0, 7)
  });

  if (isLoading) return <Loading />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
 
  console.log(generalProducts, 'generalProducts');

  return (
    <section className="general-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader subHeading="Our Products" Heading="Explore Our Products" />

      <div className="general-product-card-container w-full">
        {/* <Swiper
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
          {generalProducts.data?.map((gproduct, index) => (
            <SwiperSlide key={index} className="">
              <ProductCard key={index} {...gproduct} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>

      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default GeneralProducts;
