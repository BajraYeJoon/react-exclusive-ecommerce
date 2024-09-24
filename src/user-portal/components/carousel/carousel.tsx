import { ArrowRight } from "lucide-react";
// import { SiApple } from "react-icons/si";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "../../../common/ui/skeleton";
import { Button } from "../../../common/ui/button";
import { fetchHeroBanner } from "../../../common/api/bannerApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import { UserRoutes } from "../../utils/userLinks";

interface Content {
  id: number;
  title: string;
  description: string;
  image: string[];
}

const Carousel = () => {
  const { data: bannerData, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: fetchHeroBanner,
  });

  if (isLoading) {
    return (
      <Skeleton className="skeleton loading mt-4 h-32 w-full md:h-72 lg:h-96" />
    );
  }

  const banner = bannerData ? bannerData.bannerData : [];

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
        modules={[Pagination, Autoplay]}
        className="mySwiper w-full"
      >
        {banner.length === 0 ? (
          <div className="flex w-full items-center justify-center bg-gradient-to-r from-blue-700 to-[#B06AB3] px-6 py-12 font-sans">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Discover Our New Collection
              </h2>
              <p className="mb-8 text-center text-base text-white">
                Elevate your style with our latest arrivals. Shop now and enjoy
                exclusive discounts!
              </p>
              <Link to={`/${UserRoutes.Products}`}>
                <Button>Explore More</Button>
              </Link>
            </div>
          </div>
        ) : (
          banner.map((content: Content) => (
            <SwiperSlide key={`banner-${uuidv4()}`}>
              <div className="carousel-content grid h-56 w-full grid-cols-2 overflow-hidden bg-foreground p-4 align-middle md:grid-cols-2 md:p-0 lg:h-96">
                <div className="carousel-text flex flex-col items-start justify-center gap-0 text-background md:gap-6 md:pl-10 lg:pl-14">
                  {/* <span className="brand-icon inline-flex items-center gap-3 md:gap-6"> */}
                  {/* <SiApple className="text-md md:text-base lg:text-xl" /> */}
                  <span className="text-[10px] font-light md:text-base lg:text-lg">
                    {content.title}
                    {/* </span> */}
                  </span>
                  <h3 className="carousel-title my-2 text-balance text-sm font-medium tracking-wide sm:leading-5 md:text-2xl lg:text-5xl lg:leading-[4.2rem]">
                    {content.title}
                  </h3>
                  <Link
                    to={`/${content.title}/${content.id}`}
                    className="shop-now-link inline-flex items-center gap-1 border-b border-background/25 text-xs text-background md:text-base lg:text-lg"
                  >
                    Shop Now <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
                <div className="carousel-image flex w-full items-center">
                  <img
                    src={content.image[0]}
                    alt="Banner images for the products"
                    className="w-full rounded-sm border object-contain sm:border-0 md:mt-0 md:h-[200px] md:opacity-100 lg:h-[300px]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
