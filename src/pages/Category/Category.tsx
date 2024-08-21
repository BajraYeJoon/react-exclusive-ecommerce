import { PagesHeader } from "../../components";
// import { categories } from "../../constants/data";
import { fetchCategories } from "../../api/fetch";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Loading } from "../../site";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface CategoryType {
  id: number;
  name: string;
  icon: any;
}
const Category = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery(["categories"], fetchCategories);

  if (isLoading) return <Loading />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <section className="category-container flex flex-col gap-2 border-b border-foreground/30 pb-5 md:gap-7 md:pb-14">
      <PagesHeader subHeading="Categories" Heading="Browse by Category" />
      <div className="category-grid my-10">
        {/* <div className="grid w-full grid-cols-3 gap-6 md:grid-cols-6"> */}
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
          {categories?.map((category: CategoryType, index: number) => {
            return (
              <SwiperSlide
                className="group gap-2 rounded-md border-2 border-foreground/20 py-4 hover:border-none hover:bg-primary md:p-6"
                key={index}
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
                  <p className="text-center text-[10px] font-medium group-hover:text-background md:text-sm">
                    {category.name}
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* </div> */}
      </div>
    </section>
  );
};

export default Category;
