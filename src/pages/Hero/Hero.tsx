import { Carousel } from "../../components";
import { ChevronRight } from "lucide-react";
import { heroCategories, heroContent } from "../../constants/data";

const Hero = () => {
  return (
    <section className="flex">
      <aside className="text-foreground/80 hidden lg:flex text-lg z-10  flex-col items-start gap-4 mt-14 mr-6">
        <ul className="flex flex-col gap-3 font-medium tracking-tighter">
          {heroCategories.map((category) => (
            <li key={category.id} className="relative cursor-pointer group">
              <div className="flex items-center justify-between">
                {category.name}
                {category.subcategories && <ChevronRight />}
              </div>
              {category.subcategories && (
                <div className="subcategories hidden absolute -right-6 z-20 top-0 mt-2 bg-white border shadow-lg p-2 group-hover:block">
                  <ul>
                    {category.subcategories.map((subcategory, index) => (
                      <li key={index}>{subcategory}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <div className="bg-foreground/20 hidden lg:block w-px min-h-full"></div>

      <Carousel heroContent={heroContent} />
    </section>
  );
};

export default Hero;
