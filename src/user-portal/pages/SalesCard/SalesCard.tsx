import { useQuery } from "@tanstack/react-query";
import { NavigationArrows, PagesHeader, ProductCard } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { fetchSalesProduct } from "../../../common/api/productApi";
import ProductCardSkeleton from "../../../common/components/productCardSkeleton/ProductCardSkeleton";
import uuidv4 from "../../../common/lib/utils/uuid";
import { Button } from "../../../common/ui/button";
import useWindow from "../../../common/lib/useWindow";
import { UserRoutes } from "../../utils/userLinks";

interface SalesCardProps {
	title: string;
	price: number;
	rating: number;
	image: string;
	discountTag?: boolean;
	id: number;
	discountprice: number;
}

const SalesCard = () => {
	const { data: salesData, isLoading } = useQuery({
		queryKey: ["sale"],
		queryFn: fetchSalesProduct,
	});
	const swiperKey = uuidv4();
	const { dimension } = useWindow();
	const navigate = useNavigate();

	const salesValue = salesData ? salesData[0].products : [];

	if (salesValue.length === 0) return <NoSalesCard />;

	return (
		<section className="sales-card-container flex flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
			<div className="flex items-center justify-between">
				<PagesHeader
					subHeading="Today's Sales"
					Heading="Flash Sales"
					flashTimer
				/>
				{salesValue.length > 4 ||
					(dimension.width < 768 && (
						<div className="page-navigations flex items-center gap-2">
							<NavigationArrows
								direction="prev"
								className={`arrow-left-${swiperKey}`}
							/>
							<NavigationArrows
								direction="next"
								className={`arrow-right-${swiperKey}`}
							/>
						</div>
					))}
			</div>

			<div className="product-card-container w-full items-center justify-between gap-4 overflow-hidden">
				<Swiper
					spaceBetween={20}
					pagination={{ clickable: true }}
					className="mySwiper"
					modules={[Navigation]}
					navigation={{
						nextEl: `.arrow-right-${swiperKey}`,
						prevEl: `.arrow-left-${swiperKey}`,
					}}
					breakpoints={{
						320: {
							slidesPerView: 2,
						},
						640: {
							slidesPerView: 3,
						},
						768: {
							slidesPerView: 4,
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
							{salesValue?.map((productCard: SalesCardProps) => (
								<SwiperSlide key={`salesPRODUCT-${uuidv4()}`}>
									<ProductCard {...productCard} />
								</SwiperSlide>
							))}
						</>
					)}
				</Swiper>
			</div>

			<Button
				className="mx-auto w-full sm:w-fit"
				onClick={() => navigate(`${UserRoutes.Products}`)}
			>
				View All Products
			</Button>
		</section>
	);
};

export default SalesCard;

function NoSalesCard() {
	return (
		<section className="relative overflow-hidden rounded-sm bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8 sm:px-8 lg:py-0">
			<div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
				<div className="mt-0 max-w-xl text-center md:mt-4 lg:text-left">
					<h2 className="mb-2 text-xl font-bold leading-tight text-background sm:leading-tight md:text-3xl md:leading-tight">
						Stay Tuned for Upcoming Sales
					</h2>
					<p className="text-sm font-medium leading-relaxed text-background/50 sm:text-xl">
						Don't miss out on our exclusive offers! Sign up now to receive
						notifications about our upcoming sales and special promotions.
					</p>
				</div>
				<img
					src="https://res.cloudinary.com/dw55twddi/image/upload/v1727779308/exclusive/public/sale_brm1dp.png"
					alt="Upcoming Sales"
					loading="lazy"
					decoding="async"
					className="w-full max-w-44 lg:max-w-xs"
				/>
			</div>
			<div className="smooth-bounce absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500 opacity-20 delay-1000" />

			<div className="smooth-bounce absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500 opacity-20" />
		</section>
	);
}
