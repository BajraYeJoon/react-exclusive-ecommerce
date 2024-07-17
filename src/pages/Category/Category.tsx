import { PagesHeader } from "../../components";
import { categories } from "../../constants/data";
// import { fetchCategories } from "../../api/fetch";
// import { useQuery } from "react-query";
const Category = () => {

  // const {
  //   data: categories,
  //   error,
  //   isLoading,
  // } = useQuery(["categories"], fetchCategories, {
  //   select: (categories) => categories.slice(0, 4),
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {(error as Error).message}</div>;

  // console.log(categories, "all-categories");

  return (
    <section className="category-container flex flex-col gap-2 md:gap-7 border-b border-foreground/30 md:pb-14 pb-5">
      <PagesHeader subHeading="Categories" Heading="Browse by Category" />
      <div className="category-grid my-10">
        <div className="grid w-full md:grid-cols-6 grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                className="flex group hover:bg-primary border-2 border-foreground/20 hover:border-none items-center justify-center flex-col rounded-md gap-2 p-6"
              >
                <CategoryIcon className="w-5 h-5 md:w-10 md:h-10" />
                <p className="text-xs md:text-sm group-hover:text-background font-medium text-center">
                  {category.categoryName}
                </p>
              </div>
            );
          })} 
        </div>
      </div>
    </section>
  );
};

export default Category;
