import { useQuery } from "react-query";
import { PagesHeader, ProductCard, Button } from "../../components";
import { fetchProducts } from "../../api/fetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";
import "./styles.css";
import { Navigation } from "swiper/modules";

interface SalesCardProps {
  title: string;
  price: number;
  rating: { count: number };
  image: string;
  discountTag?: boolean;
}

const SalesCard = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(["products"], fetchProducts, {
    select: (products) => products.slice(0, 7),
    staleTime: 60000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  console.log(products, "all-products");

  return (
    <section className="sales-card-container flex flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
      <PagesHeader
        subHeading="Today's Sales"
        Heading="Flash Sales"
        flashTimer
        // handleNext={handleNext}
      />
      <div className="product-card-container flex w-full items-center justify-between gap-4 overflow-hidden">
        <Swiper
          spaceBetween={1}
          slidesPerView={4}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="mySwiper"
          modules={[Navigation]}
          navigation={true}
          // onNavigationNext={handleNext}
        >
          {products.map((productCard: SalesCardProps, index: number) => (
            <SwiperSlide key={index} className="">
              <ProductCard {...productCard} discountTag />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default SalesCard;
