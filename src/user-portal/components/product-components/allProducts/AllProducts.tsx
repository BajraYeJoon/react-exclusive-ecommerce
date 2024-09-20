import React, { useState } from "react";
import { ProductCardSkeleton } from "../../../../common/components";
import { fetchAllProducts } from "../../../../common/api/productApi";
import ProductCard from "../productCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Filter } from "lucide-react";

interface ProductType {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string[];
  availability: boolean;
  brand: string;
  categories: { id: number; name: string }[];
  onSale: boolean;
  stock: number;
}

interface FilterOptions {
  brands: string[];
  categories: string[];
  onSale: boolean;
}

const AllProducts: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("default");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    categories: [],
    onSale: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: allproducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: fetchAllProducts,
    staleTime: 60000,
  });

  if (isLoading) return <ProductCardSkeleton />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (
    type: keyof FilterOptions,
    value: string | string[] | boolean,
  ) => {
    setFilterOptions((prev) => ({ ...prev, [type]: value }));
  };

  const sortedAndFilteredProducts = [...(allproducts || [])]
    .filter((product: ProductType) => {
      if (filterOptions.onSale && !product.onSale) return false;
      if (
        filterOptions.brands.length > 0 &&
        !filterOptions.brands.includes(product.brand)
      )
        return false;
      if (
        filterOptions.categories.length > 0 &&
        !filterOptions.categories.some((cat) =>
          product.categories.some((pCat) => pCat.name === cat),
        )
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

  const uniqueBrands = Array.from(
    new Set(allproducts?.map((p: ProductType) => p.brand)),
  );
  const uniqueCategories = Array.from(
    new Set(
      allproducts?.flatMap((p: ProductType) => p.categories.map((c) => c.name)),
    ),
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mb-8 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Brand
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange("brands", value ? [value] : []);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand as string} value={brand as string}>
                    {brand as string}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange("categories", value ? [value] : []);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category as string} value={category as string}>
                    {category as string}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="onSale"
                checked={filterOptions.onSale}
                onChange={(e) => handleFilterChange("onSale", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="onSale"
                className="ml-2 block text-sm text-gray-900"
              >
                On Sale
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedAndFilteredProducts.map((product: ProductType) => (
          <ProductCard key={product.id} {...product} image={product.image[0]} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
