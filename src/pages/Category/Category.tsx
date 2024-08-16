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
          className="mySwiper flex h-16 md:h-24"
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".arrow-right",
            prevEl: ".arrow-left",
          }}
          breakpoints={{
            320: {
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
          {categories?.map((category: CategoryType, index: number) => {
            // const CategoryIcon = category.icon;
            return (
              <SwiperSlide
                key={index}
                className="group flex h-full gap-2 rounded-md border-2 border-foreground/20 py-4 hover:border-none hover:bg-primary md:p-6"
              >
                <Link to={`/category/${category.name}/${category.id}`}>
                  <p className="text-center text-[10px] font-medium group-hover:text-background md:text-sm">
                    {category.name}
                  </p>
                </Link>
                {/* <CategoryIcon className="w-5 h-5 md:w-10 md:h-10" /> */}
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
