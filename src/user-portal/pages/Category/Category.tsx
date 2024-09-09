import { PagesHeader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { v4 as uuid } from "uuid";
import "swiper/css";
import "swiper/css/navigation";
import { fetchCategories } from "../../../common/api/categoryApi";
import { Skeleton } from "../../../common/ui/skeleton";
import { Card, CardContent } from "../../../common/ui/card";
import uuidv4 from "../../../common/lib/utils/uuid";
import useWindow from "../../../common/lib/useWindow";

interface CategoryType {
  id: number;
  name: string;
  icon: string;
}
const Category = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const { dimension } = useWindow();

  let skeletonCount;
  if (dimension.width < 768) {
    skeletonCount = 3;
  } else if (dimension.width < 1024) {
    skeletonCount = 4;
  } else {
    skeletonCount = 6;
  }

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <section className="category-container flex flex-col gap-2 border-b border-foreground/30 pb-5 md:gap-7 md:pb-14">
      <PagesHeader subHeading="Categories" Heading="Browse by Category" />
      <div className="category-grid my-10">
        {isLoading ? (
          <div className="flex w-full gap-4">
            {[...Array(skeletonCount)].map(() => (
              <Card
                key={`skeleton-${uuidv4()}`}
                className="flex-grow overflow-hidden bg-white"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="mySwiper flex h-fit md:h-32"
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
              540: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
          >
            {categories?.map((category: CategoryType) => {
              return (
                <SwiperSlide
                  className="group gap-2 rounded-md border-2 border-foreground/20 py-4 hover:border-none hover:bg-primary md:p-6"
                  key={`category-${uuid()}`}
                >
                  <Link
                    to={`/category/${category.name}/${category.id}`}
                    className="flex flex-col items-center justify-center gap-1"
                  >
                    {!category.icon ? (
                      <div className="text-xl font-extrabold md:text-3xl">
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <div className="h-5 w-5 md:h-10 md:w-10">
                        {category.icon}
                      </div>
                    )}
                    <p className="text-balance text-center text-[10px] font-medium group-hover:text-background md:text-xs">
                      {category.name}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Category;
