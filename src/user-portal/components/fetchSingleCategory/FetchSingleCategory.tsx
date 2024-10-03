import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "../../../common/api/categoryApi";
import ProductCard from "../product-components/productCard/ProductCard";
import { ProductCardSkeleton } from "../../../common/components";
import CategoryNotFound from "./404category";

const FetchSingleCategory = () => {
	const { categoryId } = useParams();

	const {
		data: category,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["category"],
		queryFn: () => fetchProductByCategory(Number.parseInt(categoryId ?? "20")),
	});

	const productsByCategory = category?.data?.products || [];
	if (isLoading) {
		return <ProductCardSkeleton />;
	}
	if (error) {
		return <CategoryNotFound />;
	}
	return (
		<section className="mx-64 mb-28 gap-24 max-2xl:mx-6">
			<div className="my-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
				<h1 className="text-2xl font-medium text-gray-900">
					{category?.data?.name}
				</h1>
			</div>
			<div className="product-card-container grid h-fit w-full grid-cols-2 sm:grid-cols-3 items-center justify-between gap-4 overflow-hidden md:grid-cols-4 lg:grid-cols-5">
				{productsByCategory?.map((category: any) => (
					<ProductCard key={category?.id} {...category} />
				))}
			</div>
		</section>
	);
};

export default FetchSingleCategory;
