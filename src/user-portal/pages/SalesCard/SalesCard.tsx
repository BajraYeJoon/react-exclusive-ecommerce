import { useQuery } from "@tanstack/react-query";
import { PagesHeader, ProductCard } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { fetchSalesProduct } from "../../../common/api/productApi";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";
import uuidv4 from "../../../common/lib/utils/uuid";
import { Button } from "../../../common/ui/button";

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
    data: salesData,

    isLoading,
  } = useQuery({
    queryKey: ["sale"],
    queryFn: fetchSalesProduct,
    select: (salesData) => salesData.slice(0, 7),
  });

  console.log(salesData, "salesdATA");

  if (!salesData || salesData.length === 0)
    return (
      <div className="px-6 py-12 font-sans">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Stay tuned</h2>
          <p className="mb-8 text-center text-base">
            We're working on adding more SALE to our store. Stay tuned!
          </p>

          <Button>Explore More</Button>
        </div>
      </div>
    );

  return (
    <section className="sales-card-container flex flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
      <PagesHeader
        subHeading="Today's Sales"
        Heading="Flash Sales"
        flashTimer
      />

      <div className="product-card-container w-full items-center justify-between gap-4 overflow-hidden">
        <Swiper
          spaceBetween={20}
          pagination={{ clickable: true }}
          className="mySwiper"
          modules={[Navigation]}
          navigation={{
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
        >
          {isLoading ? (
            <ProductCardSkeleton />
          ) : (
            <>
              {salesData?.map((productCard: SalesCardProps) => (
                <SwiperSlide key={`salesPRODUCT-${uuidv4()}`} className="">
                  <ProductCard {...productCard} discountTag />
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

export default SalesCard;
