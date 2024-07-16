import React, { useState } from "react";
import Carousel from "../../components/Carousel/carousel";
import { AlignRightIcon, ChevronRight, MoveRightIcon } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Women's Fashion",
    subcategories: ["Dresses", "Tops", "Shoes"],
  },
  { id: 2, name: "Men's Fashion", subcategories: ["Shirts", "Pants", "Shoes"] },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Toys & Games" },
  { id: 6, name: "Books" },
  { id: 7, name: "Electronics" },
  { id: 8, name: "Beauty & Personal Care" },
];

const images = [
  "https://plus.unsplash.com/premium_photo-1688045722767-8d8672f6950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1720728659925-9ca9a38afb2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1720937172267-575f3575386b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
];

const Hero = () => {
  const [visibleSubcategories, setVisibleSubcategories] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSubcategories = (id: number) => {
    setVisibleSubcategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="flex">
      <aside className="text-foreground/80 text-lg z-10 flex flex-col items-start gap-4 mt-14 mr-6">
        <ul className="flex flex-col gap-3 font-semibold">
          {categories.map((category) => (
            <li key={category.id} className="relative">
              <div className="flex items-center justify-between">
                {category.name}
                {category.subcategories && (
                  <button
                    onClick={() => toggleSubcategories(category.id)}
                    className="ml-2"
                  >
                    <ChevronRight />
                  </button>
                )}
              </div>
              {category.subcategories && visibleSubcategories[category.id] && (
                <div className="absolute right-0-full z-20 top-0 mt-2 bg-white border shadow-lg p-2">
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
      <div className="bg-foreground/20 w-px min-h-full"></div>

      <Carousel images={images} />
    </section>
  );
};

export default Hero;
