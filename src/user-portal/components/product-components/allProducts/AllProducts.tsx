import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllProducts } from "../../../../common/api/productApi";
import {
  ProductType,
  useProductFilters,
} from "../../../hooks/useProductFilter";
import { ProductCardSkeleton } from "../../../../common/components";
import ProductFilters from "../../filters/ProductFilters";
import ProductCard from "../productCard/ProductCard";
import { Filter } from "lucide-react";

const AllProducts: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: fetchAllProducts,
  });

  const {
    sortOption,
    filterOptions,
    handleSortChange,
    handleFilterChange,
    getFilteredAndSortedProducts,
    getUniqueBrands,
    getUniqueCategories,
  } = useProductFilters(allProducts || []);

  if (isLoading) return <ProductCardSkeleton />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const filteredAndSortedProducts = getFilteredAndSortedProducts();
  const uniqueBrands = getUniqueBrands();
  const uniqueCategories = getUniqueCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      {isFilterOpen && (
        <ProductFilters
          filterOptions={filterOptions}
          sortOption={sortOption}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          uniqueBrands={uniqueBrands}
          uniqueCategories={uniqueCategories}
        />
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredAndSortedProducts.map((product: ProductType) => (
          <ProductCard key={product.id} {...product} image={product.image[0]} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
