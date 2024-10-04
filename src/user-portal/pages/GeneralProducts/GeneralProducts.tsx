import { PagesHeader, ProductCard } from "../../components";
import { Button } from "../../../common/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../common/api/productApi";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";
import uuidv4 from "../../../common/lib/utils/uuid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants } from "../../../common/lib/utils/motionVariants";

const GeneralProducts = () => {
	const { data: generalProducts, isLoading } = useQuery({
		queryKey: ["generalProducts"],
		queryFn: fetchAllProducts,
		select: (generalProducts) => generalProducts.slice(0, 8),
	});

	return (
		<section className="general-products-container flex flex-col gap-4 lg:gap-20">
			<PagesHeader subHeading="Our Products" Heading="Explore Our Products" />

			{isLoading ? (
				<ProductCardSkeleton />
			) : (
				<motion.div
					className="general-product-card-container grid h-fit w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{generalProducts?.map((gproduct: any) => (
						<ProductCard {...gproduct} key={uuidv4()} />
					))}
				</motion.div>
			)}

			<Button className="mx-auto w-full sm:w-fit">
				<Link to={"/products"}>View All Products</Link>
			</Button>
		</section>
	);
};

export default GeneralProducts;
