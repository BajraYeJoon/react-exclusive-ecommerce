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
// import { bestSellingProducts } from "../../constants/data";
import { Link } from "react-router-dom";

interface SalesCardProps {
  title: string;
  price: number;
  rating: number;
  image: string;
  discountTag?: boolean;
  id: number;
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

      <div className="product-card-container w-full items-center justify-between gap-4 overflow-hidden">
        <Swiper
          spaceBetween={20}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          className="mySwiper"
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".arrow-right",
            prevEl: ".arrow-left",
          }}
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
          // onNavigationNext={handleNext}
        >
          {products.map((productCard: SalesCardProps, index: number) => (
            <SwiperSlide key={index} className="">
              <ProductCard {...productCard} discountTag />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button className="mx-auto w-full md:w-fit">
        <Link to={"/products"}>View All Products</Link>
      </Button>
    </section>
  );
};

export default SalesCard;
