import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";
import { SiApple } from "react-icons/si";
import { Link } from "react-router-dom";
import { fetchHeroBanner } from "../../api/fetch";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "../ui/skeleton";

const Carousel = () => {
  const { data: bannerData, isLoading } = useQuery("banner", fetchHeroBanner);

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-xl bg-red-500" />;
  }

  const banner = bannerData[0].products;
  console.log(banner);

  return (
    <div className="carousel-container w-4/5 flex-1 pt-4 lg:pl-14 lg:pt-14">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper w-full"
      >
        {banner?.map((content, index) => (
          <SwiperSlide key={index} className="">
            <div className="carousel-content grid h-56 w-full grid-cols-1 overflow-hidden bg-foreground p-4 align-middle md:grid-cols-2 md:p-0 lg:h-96">
              <div className="carousel-text flex flex-col items-start justify-center gap-0 text-background md:gap-6 md:pl-10 lg:pl-14">
                <span className="brand-icon inline-flex items-center gap-3 md:gap-6">
                  <SiApple className="text-md md:text-base lg:text-xl" />
                  <span className="text-xs font-light md:text-base lg:text-lg">
                    {content.title}
                  </span>
                </span>
                <h1 className="carousel-title text-balance text-2xl font-medium leading-[4.2rem] tracking-wide lg:text-5xl">
                  {content.title}
                </h1>
                <Link
                  to="/products"
                  className="shop-now-link inline-flex items-center gap-1 border-b border-background/25 text-xs text-background md:text-base lg:text-lg"
                >
                  Shop Now <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
              <div className="carousel-image flex w-full items-center">
                <img
                  src={content.image[0]}
                  alt="Description"
                  className="-mt-14 w-full object-contain opacity-50 md:mt-0 md:h-[200px] md:opacity-100 lg:h-[300px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;