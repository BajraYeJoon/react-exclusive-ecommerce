import { Carousel } from "../../components";
import { ChevronRight } from "lucide-react";
// import { heroCategories } from "../../constants/data";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Skeleton } from "../../components/ui/skeleton";
import { fetchCategories } from "../../api/categoryApi";

interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

const Hero = () => {
  const { data: heroCategoriesData, isLoading } = useQuery(
    "heroCategory",
    fetchCategories,
  );

  if (isLoading) {
    console.log("hero banner loading .....");
    return <div>Loading...</div>;
  }

  const heroCategories =
    (heroCategoriesData && heroCategoriesData.slice(0, 8)) || [];

  return (
    <section className="flex">
      <aside className="z-10 mr-6 mt-14 hidden flex-col items-start gap-4 text-lg text-foreground/80 lg:flex">
        <ul className="flex flex-col gap-3 font-medium tracking-tighter">
          {heroCategories &&
            heroCategories.map((category: Category) => (
              <li key={category.id} className="group relative cursor-pointer">
                {isLoading ? (
                  <Skeleton className="h-6 w-full rounded-md bg-red-500" />
                ) : (
                  <div className="flex items-center justify-between">
                    <Link to={`/category/${category.name}/${category.id}`}>
                      {category.name}
                    </Link>
                    {category.subcategories && <ChevronRight />}
                  </div>
                )}
                {category.subcategories && (
                  <div className="subcategories absolute -right-6 top-0 z-20 mt-2 hidden border bg-white p-2 shadow-lg group-hover:block">
                    <ul>
                      {category.subcategories.map(
                        (subcategory: string, index: number) => (
                          <li key={index}>
                            <Link to={"/products"}>{subcategory}</Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </aside>
      <div className="hidden min-h-full w-px bg-foreground/20 lg:block"></div>

      <Carousel />
    </section>
  );
};

export default Hero;
