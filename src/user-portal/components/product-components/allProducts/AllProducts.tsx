import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchAllProducts } from "../../../../common/api/productApi";
import {
	ProductType,
	useProductFilters,
} from "../../../hooks/useProductFilter";
import { ProductCardSkeleton } from "../../../../common/components";
import ProductFilters from "../../filters/ProductFilters";
import ProductCard from "../productCard/ProductCard";
import { Filter } from "lucide-react";
import { Button } from "../../../../common/ui/button";

const AllProducts = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 8,
	});

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

	const filteredAndSortedProducts = useMemo(() => {
		return getFilteredAndSortedProducts();
	}, [getFilteredAndSortedProducts]);

	const paginatedProducts = useMemo(() => {
		const start = pagination.pageIndex * pagination.pageSize;
		const end = start + pagination.pageSize;
		return filteredAndSortedProducts.slice(start, end);
	}, [filteredAndSortedProducts, pagination.pageIndex, pagination.pageSize]);

	if (isLoading) return <ProductCardSkeleton />;
	if (error) return <div>An error occurred: {(error as Error).message}</div>;

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
				<h1 className="text-2xl font-bold text-gray-900">All Products</h1>
				<button
					type="button"
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
					uniqueBrands={getUniqueBrands()}
					uniqueCategories={getUniqueCategories()}
				/>
			)}

			<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
				{paginatedProducts.map((product: ProductType) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>

			<div className="mt-8 flex items-center justify-between">
				<Button
					onClick={() =>
						setPagination((prev) => ({
							...prev,
							pageIndex: prev.pageIndex - 1,
						}))
					}
					disabled={pagination.pageIndex === 0}
				>
					Previous
				</Button>
				<span>
					Page {pagination.pageIndex + 1} of{" "}
					{Math.ceil(filteredAndSortedProducts.length / pagination.pageSize)}
				</span>
				<Button
					onClick={() =>
						setPagination((prev) => ({
							...prev,
							pageIndex: prev.pageIndex + 1,
						}))
					}
					disabled={
						pagination.pageIndex >=
						Math.ceil(filteredAndSortedProducts.length / pagination.pageSize) -
							1
					}
				>
					Next
				</Button>
			</div>
		</section>
	);
};

export default AllProducts;
