import PagesHeader from "../../components/pagesHeader/PagesHeader";
import ProductCard from "../../components/product-components/productCard/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../../../common/api/productApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const BestProducts = () => {
	const { data: bestSellingProducts, isLoading } = useQuery({
		queryKey: ["bestSellingProducts"],
		queryFn: fetchBestSellingProducts,
		select: (data) => data.slice(0, 5),
	});

	return (
		<section className="flex flex-col gap-20 max-2xl:gap-10">
			<PagesHeader
				subHeading="This Month"
				Heading="Best Selling Products"
				cta="/products"
			/>

			<Swiper
				spaceBetween={20}
				pagination={{ clickable: true }}
				className="mySwiper w-full"
				modules={[Navigation]}
				navigation={{
					enabled: true,
					nextEl: ".arrow-right",
					prevEl: ".arrow-left",
				}}
				breakpoints={{
					320: {
						slidesPerView: 2,
					},
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
			>
				{isLoading ? (
					<ProductCardSkeleton />
				) : (
					<>
						{bestSellingProducts?.map((bestProductCard: any) => (
							<SwiperSlide key={`bestproduct-${uuidv4()}`}>
								<ProductCard {...bestProductCard} />
							</SwiperSlide>
						))}
					</>
				)}
			</Swiper>
		</section>
	);
};

export default BestProducts;
