import { PagesHeader } from "../../components";
import { categories } from "../../constants/data";
import { fetchCategories } from "../../api/fetch";
import { useQuery } from "react-query";
const Category = () => {
  // const {
  //   data: categories,
  //   error,
  //   isLoading,
  // } = useQuery(["categories"], fetchCategories, {
  //   select: (categories) => categories.slice(0, 4),
  //   staleTime: 60000,
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {(error as Error).message}</div>;

  // console.log(categories, "all-categories");

  return (
    <section className="category-container flex flex-col gap-2 border-b border-foreground/30 pb-5 md:gap-7 md:pb-14">
      <PagesHeader subHeading="Categories" Heading="Browse by Category" />
      <div className="category-grid my-10">
        <div className="grid w-full grid-cols-3 gap-6 md:grid-cols-6">
          {categories?.map((category, index) => {
            // const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center gap-2 rounded-md border-2 border-foreground/20 p-6 hover:border-none hover:bg-primary"
              >
                {/* <CategoryIcon className="w-5 h-5 md:w-10 md:h-10" /> */}
                <p className="text-center text-xs font-medium group-hover:text-background md:text-sm">
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
