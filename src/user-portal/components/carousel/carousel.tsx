import { ArrowRight } from "lucide-react";
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
import { FormattedMessage } from "react-intl";

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
          <NotFoundBanner />
        ) : (
          banner.map((content: Content) => (
            <SwiperSlide key={`banner-${uuidv4()}`}>
              <div className="carousel-content grid h-44 w-full grid-cols-2 overflow-hidden bg-foreground p-4 align-middle md:h-56 md:grid-cols-2 md:p-0 lg:h-fit">
                <div className="carousel-text flex flex-col items-start justify-center gap-0 text-background md:gap-2 md:pl-10 lg:gap-6 lg:pl-14">
                  <span className="text-[9px] font-light md:text-sm">
                    {content.title.slice(0, 30)}...
                  </span>
                  <h3 className="carousel-title my-2 text-ellipsis text-xs font-medium tracking-wide md:leading-5 lg:text-xl xl:text-2xl">
                    {content.title.slice(0, 50)}...
                  </h3>
                  <Link
                    to={`/${content.title}/${content.id}`}
                    className="shop-now-link inline-flex items-center gap-1 border-b border-background/25 text-xs text-background md:text-base lg:text-lg"
                  >
                    Shop Now <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
                <div className="carousel-image flex w-full items-center p-4 md:h-[200px] md:opacity-100 lg:h-[300px]">
                  <img
                    src={content.image[0]}
                    alt="Banner images for the products"
                    className="h-full w-full rounded-sm border object-cover sm:border-0 sm:object-contain md:mt-0"
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

function NotFoundBanner() {
  return (
    <div className="relative grid items-center gap-12 bg-gradient-to-r from-indigo-100 to-[#BBB3FF] px-6 py-6 sm:px-12 lg:grid-cols-2 lg:py-0">
      <div className="text-center lg:text-left">
        <h2 className="mb-4 text-2xl font-medium text-foreground sm:text-3xl lg:text-5xl">
          <FormattedMessage id="heroBanner" />
        </h2>
        <p className="mb-8 text-sm text-gray-700 sm:text-base">
          <FormattedMessage id="heroBannerDescription" />
        </p>
        <Link to={`/${UserRoutes.Products}`}>
          <Button size="lg" className="px-8 py-3 text-lg">
            <FormattedMessage id="exploreNow" />
          </Button>
        </Link>
      </div>
      <img
        src="/shop.png"
        alt="Hero image"
        className="hidden max-w-sm items-end border-none object-contain lg:flex"
      />
    </div>
  );
}
