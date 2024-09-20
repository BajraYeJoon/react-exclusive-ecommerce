import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "../../../common/api/categoryApi";
import ProductCard from "../product-components/productCard/ProductCard";
import { ProductCardSkeleton } from "../../../common/components";
// import { useProductFilters } from "../../hooks/useProductFilter";
// import { useState } from "react";
// import ProductFilters from "../filters/ProductFilters";
// import { Filter } from "lucide-react";
const FetchSingleCategory = () => {
  const { categoryId } = useParams();
  // const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchProductByCategory(parseInt(categoryId ?? "20")),
  });

  const productsByCategory = category?.data?.products || [];

  // const {
  //   sortOption,
  //   filterOptions,
  //   handleSortChange,
  //   handleFilterChange,
  //   getFilteredAndSortedProducts,
  //   getUniqueBrands,
  //   getUniqueCategories,
  // } = useProductFilters(productsByCategory || []);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const filteredAndSortedProducts = getFilteredAndSortedProducts();
  // const uniqueBrands = getUniqueBrands();
  // const uniqueCategories = getUniqueCategories();

  return (
    <section className="mx-6 mb-28 gap-24 lg:mx-44">
      <div className="my-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-medium text-gray-900">
          {category?.data?.name}
        </h1>
        {/* <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button> */}
      </div>

      {/* {isFilterOpen && (
        <ProductFilters
          filterOptions={filterOptions}
          sortOption={sortOption}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          uniqueBrands={uniqueBrands}
          uniqueCategories={uniqueCategories}
        />
      )} */}
      <div className="product-card-container grid w-full grid-cols-2 items-center justify-between gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        {productsByCategory?.map((category: any) => (
          <ProductCard
            key={category?.id}
            {...category}
            images={category.image[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default FetchSingleCategory;
