import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "../../../common/ui/skeleton";
import { Button } from "../../../common/ui/button";
import { fetchHeroBanner } from "../../../common/api/bannerApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import { UserRoutes } from "../../utils/userLinks";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";

interface Content {
	id: number;
	title: string;
	description: string;
	image: string[];
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: -10 },
	show: { opacity: 1, y: 0, transition: { type: "spring" } },
};


const Carousel = () => {
	const { data: bannerData, isLoading } = useQuery({
		queryKey: ["banner"],
		queryFn: fetchHeroBanner,
	});

	if (isLoading) {
		return (
			<Skeleton className="skeleton loading mt-4 h-32 w-full md:h-72 lg:h-96" />
		);
	}

	const banner = bannerData ? bannerData.bannerData : [];

	
	return (
		<div className="carousel-container w-4/5 flex-1 pt-4 lg:pl-14 lg:pt-14">
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination, Autoplay]}
				className="mySwiper w-full"
			>
				{banner.length === 0 ? (
					<NotFoundBanner />
				) : (
					banner.map((content: Content) => (
						<SwiperSlide key={`banner-${uuidv4()}`}>
							<motion.div
								initial="hidden"
								animate="show"
								viewport={{ once: true }}
								variants={{
									show: {
										transition: {
											staggerChildren: 0.1,
										},
									},
								}}
								className="carousel-content grid h-44 w-full grid-cols-2 overflow-hidden bg-foreground p-4 place-items-center md:h-56 md:grid-cols-2 md:p-0 lg:h-fit"
							>
								<div className="carousel-text flex h-full w-full flex-col items-start justify-center gap-0 text-background md:gap-2 pl-2 md:pl-10 lg:pl-14 lg:gap-6 ">
									<motion.span
										className="text-[9px] font-light md:text-sm"
										variants={FADE_DOWN_ANIMATION_VARIANTS}
									>
										{content.title.slice(0, 30)}...
									</motion.span>
									<motion.h3
										className="carousel-title my-2 text-ellipsis text-sm sm:text-lg font-medium tracking-wide md:leading-5 md:text-xl xl:text-3xl"
										variants={FADE_DOWN_ANIMATION_VARIANTS}
									>
										{content.title.slice(0, 50)}...
									</motion.h3>
									<Link
										to={`/${content.title}/${content.id}`}
										className="shop-now-link inline-flex items-center gap-1 border-b border-background/25 text-xs text-background md:text-base lg:text-lg"
									>
										Shop Now <ArrowRight size={20} className="ml-2" />
									</Link>
								</div>
								<motion.div
									className="carousel-image flex w-full justify-center h-fit sm:h-[180px] md:h-[200px] items-center md:p-4 md:opacity-100 lg:h-[300px]"
									variants={FADE_DOWN_ANIMATION_VARIANTS}
								>
									<img
										src={content.image[0]}
										loading="lazy"
										decoding="async"
										alt="Banner images for the products"
										className="h-full w-full rounded-sm object-top  object-cover  sm:object-cover md:mt-0"
									/>
								</motion.div>
							</motion.div>
						</SwiperSlide>
					))
				)}
			</Swiper>
		</div>
	);
};

export default Carousel;

function NotFoundBanner() {
	return (
		<motion.div
			className="relative grid items-center gap-12 bg-gradient-to-r from-indigo-100 to-[#BBB3FF] px-6 py-6 sm:px-12 lg:grid-cols-2 lg:py-0"
			initial="hidden"
			animate="show"
			viewport={{ once: true }}
			variants={{
				show: {
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<div className="text-center lg:text-left">
				<motion.h2
					className="mb-4 text-2xl font-medium text-foreground sm:text-3xl lg:text-5xl"
					variants={FADE_DOWN_ANIMATION_VARIANTS}
				>
					<FormattedMessage id="heroBanner" />
				</motion.h2>
				<motion.p
					className="mb-8 text-sm text-gray-700 sm:text-base"
					variants={FADE_DOWN_ANIMATION_VARIANTS}
				>
					<FormattedMessage id="heroBannerDescription" />
				</motion.p>
				<Link to={`/${UserRoutes.Products}`}>
					<Button size="lg" className="px-8 py-3 text-lg">
						<FormattedMessage id="exploreNow" />
					</Button>
				</Link>
			</div>
			<motion.img
				src="/shop.png"
				alt="Banner  Not Found Fallback"
				className="hidden max-w-sm items-end border-none object-contain lg:flex"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			/>
		</motion.div>
	);
}
