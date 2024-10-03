import { useQuery } from "@tanstack/react-query";
import { PagesHeader, ProductCard } from "../../../user-portal/components";
import { fetchAllProducts } from "../../api/productApi";
import uuidv4 from "../../lib/utils/uuid";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
const HalloweenMain = () => {
	const { data: halloweenData, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
	});

	const halloweenValue = halloweenData
		? halloweenData.filter((product: { categories: { name: string }[] }) =>
				product.categories.some(
					(category: { name: string }) => category.name === "Halloween",
				),
			)
		: [];

	return (
		<section className="halloween-bg">
			<div className="relative flex flex-col gap-4 py-4">
				<div className="halloween-collections-container grid h-[150px] w-full grid-cols-[2fr_0.8fr] gap-4 *:rounded-lg md:h-[300px] lg:h-[600px]">
					<div className="relative w-full overflow-hidden bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/halloween/hall_cvnjgs.webp')] bg-cover bg-top bg-no-repeat" />
					<div className="relative w-full overflow-hidden bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779304/exclusive/public/halloween/hall-2_t7ffce.webp')] bg-cover bg-top bg-no-repeat">
						<div className="absolute left-16 top-16 hidden flex-col items-center justify-center gap-3 md:flex">
							<p className="font-creepster text-2xl">Halloween</p>
							<span className="font-creepster text-8xl font-extrabold">
								SALE
							</span>
							<span className="font-creepster font-extrabold uppercase tracking-wider">
								Upto 60% off
							</span>
						</div>
					</div>
				</div>

				{/* latest collections */}
				<div className="relative mx-72 flex flex-col gap-16 py-4 max-2xl:mx-6">
					<div className="sales-card-container flex flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
						<div className="flex items-center justify-between">
							<PagesHeader
								subHeading="Enjoy Halloween"
								Heading="Latest Collections "
								className="*:text-white"
							/>
						</div>

						{isLoading ? (
							<ProductCardSkeleton />
						) : (
							<div className="general-product-card-container grid h-fit w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
								{halloweenValue?.map((gproduct: any) => (
									<ProductCard
										{...gproduct}
										key={uuidv4()}
										className="font-denk font-light text-white"
									/>
								))}
							</div>
						)}
					</div>

					{/* Banner */}
					<div className="relative h-[150px] w-full overflow-hidden rounded-lg bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/halloween/save_e6dkku.webp')] bg-cover bg-top bg-no-repeat">
						<div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-gray-900 to-transparent opacity-55" />
						<div className="absolute left-2 top-8 space-y-3 px-3">
							<h1 className="text-left text-sm font-bold leading-none tracking-wider text-white sm:text-base md:text-xl md:leading-10 lg:text-3xl">
								Save Big on Halloween
							</h1>
							<p className="max-w-lg text-xs font-medium leading-none tracking-wider text-white md:text-sm">
								Get ready for the spookiest season with our exclusive Halloween
								collection.
							</p>
						</div>
					</div>

					{/* Grid Details */}
					<div className="grid h-[600px] grid-cols-1 gap-8 *:w-full *:rounded-lg *:bg-white md:grid-cols-2">
						{/* Grid  1 */}
						<div className="row-span-2 flex h-full w-full flex-col items-center justify-start gap-4 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/halloween/hgrid1_whannh.webp')] bg-cover bg-no-repeat py-4 text-white md:pt-16 lg:pt-12">
							<span className="text-xs font-light sm:text-sm lg:text-lg">
								Enjoy your halloween Night
							</span>
							<h3 className="font-creepster max-w-lg text-center text-lg text-green-400 md:text-3xl lg:text-5xl">
								Beautiful All Night Party Halloween Accessories
							</h3>
							<p className="font-creepster text-base font-extrabold text-yellow-300 md:text-6xl lg:text-8xl">
								-50 %
							</p>
						</div>
						{/* Grid 2 */}
						<div className="flex h-full w-full flex-col items-center justify-start gap-4 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/halloween/hgrid2_arjzjs.webp')] bg-cover bg-no-repeat p-4 text-white md:pt-10">
							<span className="text-xs font-light sm:text-sm lg:text-lg">
								Latest Collections
							</span>
							<h3 className="font-creepster max-w-xl text-center text-lg text-yellow-400 md:text-3xl lg:text-5xl">
								Pumpkin Masks Collection
							</h3>
							<p className="font-creepster text-base font-extrabold capitalize text-orange-200 md:text-xl lg:text-3xl">
								-30 % off on all masks
							</p>
						</div>
						{/* Grid 3 */}
						<div className="flex h-full w-full flex-col items-center justify-start gap-4 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/halloween/hgrid3_dtlb7t.webp')] bg-cover bg-no-repeat p-4 text-white md:py-14 lg:py-16">
							<span className="text-lg font-light">Beautiful Dresses</span>
							<h3 className="font-creepster max-w-xl text-center text-lg text-yellow-400 md:text-3xl lg:text-5xl">
								Party Dress Collections
							</h3>
							<p className="font-creepster text-base font-extrabold capitalize text-orange-200 md:text-xl lg:text-3xl">
								-10 % off on all dresses
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HalloweenMain;
