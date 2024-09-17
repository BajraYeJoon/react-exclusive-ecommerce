import { useState } from "react";
import { ProductCardSkeleton } from "../../../../common/components";
import { fetchAllProducts } from "../../../../common/api/productApi";
import ProductCard from "../productCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown } from "lucide-react";
import { Label } from "../../../../common/ui/label";

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
  availability: boolean;
  onSale: boolean;
}

const AllProducts = () => {
  const [sortOption, setSortOption] = useState<string>("default");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    categories: [],
    availability: false,
    onSale: false,
  });

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
      if (filterOptions.availability && product.stock <= 0) return false;
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
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      {/* Sorting and Filtering Options */}
      <div className="mb-6 flex w-full justify-between">
        <div className="flex items-center">
          <p>Sort By:</p>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="ml-2 rounded-md border outline-none"
          >
            <option value="default">
              <ChevronDown className="mr-2 h-4 w-4" />
              Default
            </option>
            <option value="price-asc">
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              Price: Low to High
            </option>
            <option value="price-desc">
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          {/* Availability Filter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filterOptions.availability}
              onChange={(e) =>
                handleFilterChange("availability", e.target.checked)
              }
            />
            <label className="ml-2">In Stock Only</label>
          </div>

          {/* Brand Filter */}
          <div>
            <label>Brand: </label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange("brands", value ? [value] : []);
              }}
              className="ml-2 rounded-md border outline-none"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand as string} value={brand as string}>
                  {brand as string}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label>Category: </label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange("categories", value ? [value] : []);
              }}
              className="ml-2 rounded-md border outline-none"
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
              checked={filterOptions.onSale}
              onChange={(e) => handleFilterChange("onSale", e.target.checked)}
            />
            <Label className="ml-2">On Sale</Label>
          </div>
        </div>
      </div>

      <div className="product-card-container grid w-full grid-cols-2 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        {sortedAndFilteredProducts.map((product: ProductType) => (
          <ProductCard key={product.id} {...product} image={product.image[0]} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
