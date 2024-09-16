import React, { useState, useEffect, useRef } from "react";
import { ChevronsUpDown, Check, X } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: number[];
  onCategorySelect: (categoryId: number) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        htmlFor="category-selector"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Categories
      </label>
      <button
        type="button"
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id="category-selector"
      >
        {selectedCategories.length > 0
          ? `${selectedCategories.length} categories selected`
          : "Select categories"}
        <ChevronsUpDown className="float-right h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-auto" role="listbox">
            {filteredCategories.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">No category found.</li>
            ) : (
              filteredCategories.map((category) => (
                <li
                  key={category.id}
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => onCategorySelect(category.id)}
                  role="option"
                  aria-selected={selectedCategories.includes(category.id)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedCategories.includes(category.id)
                        ? "opacity-60"
                        : "opacity-0"
                    }`}
                  />
                  {category.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {categories
          .filter((category) => selectedCategories.includes(category.id))
          .map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800"
            >
              {category.name}
              <button
                type="button"
                className="ml-1 inline-flex items-center rounded-full p-0.5 text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => onCategorySelect(category.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
      </div>
      <p className="mt-1 text-sm text-gray-500">
        You can select multiple categories.
      </p>
    </div>
  );
};

export default CategorySelector;
