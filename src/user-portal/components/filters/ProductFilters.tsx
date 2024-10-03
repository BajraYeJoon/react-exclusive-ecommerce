import { Label } from "../../../common/ui/label";
import { FilterOptions, SortOption } from "../../hooks/useProductFilter";

interface FilterOptionsProps {
	filterOptions: FilterOptions;
	sortOption: SortOption;
	handleFilterChange: (type: keyof FilterOptions, value: any) => void;
	handleSortChange: (newSortOption: SortOption) => void;
	uniqueBrands: string[];
	uniqueCategories: string[];
}

const ProductFilters = ({
	filterOptions,
	sortOption,
	handleFilterChange,
	handleSortChange,
	uniqueBrands,
	uniqueCategories,
}: FilterOptionsProps) => {
	return (
		<div className="mb-8 rounded-md border border-gray-200 bg-background p-4 shadow-sm">
			<h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
				<div>
					<Label className="mb-1 block text-sm font-medium text-gray-700">
						Sort By
					</Label>
					<select
						value={sortOption}
						onChange={(e) => handleSortChange(e.target.value as SortOption)}
						className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
					>
						<option value="default">Default</option>
						<option value="price-asc">Price: Low to High</option>
						<option value="price-desc">Price: High to Low</option>
					</select>
				</div>
				<div>
					<Label className="mb-1 block text-sm font-medium text-gray-700">
						Brand
					</Label>
					<select
						onChange={(e) => {
							const value = e.target.value;
							handleFilterChange("brands", value ? [value] : []);
						}}
						className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
					>
						<option value="">All Brands</option>
						{uniqueBrands.map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
				</div>
				<div>
					<Label className="mb-1 block text-sm font-medium text-gray-700">
						Category
					</Label>
					<select
						onChange={(e) => {
							const value = e.target.value;
							handleFilterChange("categories", value ? [value] : []);
						}}
						className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
					>
						<option value="">All Categories</option>
						{uniqueCategories?.map((category) => (
							<option key={category} value={category}>
								{category}
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
						className="h-4 w-4 rounded border-gray-300"
					/>
					<label htmlFor="onSale" className="ml-2 block text-sm text-gray-900">
						On Sale
					</label>
				</div>
			</div>
		</div>
	);
};

export default ProductFilters;
