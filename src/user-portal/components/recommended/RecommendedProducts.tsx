import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../../common/api/productApi";
import type { ProductType } from "../../hooks/useProductFilter";
import ProductCard from "../product-components/productCard/ProductCard";
import uuidv4 from "../../../common/lib/utils/uuid";

const RecommendedProducts = ({
	currentProductId,
}: { currentProductId: number }) => {
	const [recommendations, setRecommendations] = useState([]);

	const { data: allProducts } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
	});

	useEffect(() => {
		const fetchProducts = async () => {
			if (!allProducts) return;

			const currentProduct = allProducts.find(
				(p: ProductType) => p.id === currentProductId,
			);

			const sameCategories = allProducts.filter(
				(product: ProductType) =>
					product.id !== currentProductId &&
					product.categories.some((cat) =>
						currentProduct.categories.some(
							(currentCat: { id: number; name: string }) =>
								currentCat.id === cat.id,
						),
					),
			);

			const topRecommendations = sameCategories.slice(0, 5);

			setRecommendations(topRecommendations);
		};

		fetchProducts();
	}, [allProducts, currentProductId]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
			{recommendations?.length > 0 ? (
				recommendations?.map((product: ProductType) => (
					<ProductCard {...product} key={`recommendations-${uuidv4()}`} />
				))
			) : (
				<div>No recommendations available</div>
			)}
		</div>
	);
};

export default RecommendedProducts;