import { useQuery } from "react-query";
import { PagesHeader, ProductCard, Button } from "../../components";
import { fetchProducts } from "../../api/fetch";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";

// import "./styles.css";
// import { Navigation, Pagination } from "swiper/modules";

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
    select: (products) => products.slice(0, 4),
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
      />
      <div className="product-card-container flex w-full items-center justify-between gap-4 overflow-hidden">
        {/* <>
        <Swiper
          spaceBetween={1}
          slidesPerView={4}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className=""
          modules={[Pagination, Navigation]}
          navigation={{
            nextEl: ".swiper-custom-next",
            prevEl: ".swiper-custom-prev",
          }}
        >
          {products.map((productCard: SalesCardProps, index: number) => (
            <SwiperSlide key={index} className="">
              <ProductCard {...productCard} discountTag />
            </SwiperSlide>
          ))}
        </Swiper> */}

        {products.map((productCard: SalesCardProps, index: number) => (
          <ProductCard {...productCard} discountTag key={index} />
        ))}
      </div>

      {/* </div> */}
      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
      <div className="swiper-custom-next">next</div>
      <div className="">prev</div>
    </section>
  );
};

export default SalesCard;
