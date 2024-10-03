import { useState } from "react";

export interface ProductType {
		id: number;
		title: string;
		price: number;
		rating: number;
		image: string;
		availability: boolean;
		brand: string;
		categories: { id: number; name: string }[];
		onSale: boolean;
		stock: number;
		discountprice: number;
		description: string;
	}

export interface FilterOptions {
	brands: string[];
	categories: string[];
	onSale: boolean;
}

export type SortOption = "default" | "price-asc" | "price-desc";

export const useProductFilters = (initialProducts: ProductType[]) => {
	const [sortOption, setSortOption] = useState<SortOption>("default");
	const [filterOptions, setFilterOptions] = useState<FilterOptions>({
		brands: [],
		categories: [],
		onSale: false,
	});

	const handleSortChange = (newSortOption: SortOption) => {
		setSortOption(newSortOption);
	};

	const handleFilterChange = (
		type: keyof FilterOptions,
		value: string | string[] | boolean | number | undefined,
	) => {
		setFilterOptions((prev) => ({ ...prev, [type]: value }));
	};

	const getFilteredAndSortedProducts = () => {
		return initialProducts
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
	};

	const getUniqueBrands = () => [
		...new Set(initialProducts.map((p) => p.brand)),
	];

	const getUniqueCategories = () => [
		...new Set(initialProducts.flatMap((p) => p.categories.map((c) => c.name))),
	];

	return {
		sortOption,
		filterOptions,
		handleSortChange,
		handleFilterChange,
		getFilteredAndSortedProducts,
		getUniqueBrands,
		getUniqueCategories,
	};
};
