import { BadgeCheck, ThumbsUp } from "lucide-react";
import { BiMoneyWithdraw } from "react-icons/bi";

const BrandZone = () => {
	return (
		<section className="relative mx-72 flex flex-col gap-16 py-4 max-2xl:mx-6">
			{/* Banner */}

			<div className="brand-zone-container grid h-[400px] grid-cols-1 grid-rows-5 gap-4 *:w-full *:rounded-lg md:h-[500px] md:grid-cols-2 md:grid-rows-4 lg:grid-rows-4">
				<div className="flex items-center justify-between bg-black px-2 sm:px-4 md:px-6 lg:col-span-2">
					<div className="flex items-center justify-start gap-2 text-base font-extrabold text-[#FBA97D] sm:text-xl md:text-4xl">
						<BadgeCheck size={40} />
						<h1>Brand Zone</h1>
						<span
							className="hidden rounded-lg px-4 py-2 text-2xl font-medium text-foreground md:block"
							style={{
								background:
									"linear-gradient(90deg, rgba(251,169,125,0.6) 0%, rgba(251,169,125,0.7) 100%)",
							}}
						>
							2K+ Brands
						</span>
					</div>

					<div className="text-medium flex items-center justify-center gap-2 text-[8px] font-light text-white md:text-base">
						<span className="flex items-center justify-center gap-2 border-r border-r-white pr-2">
							<ThumbsUp size={20} className="hidden md:block" /> 100% Authentic
						</span>
						<span className="flex items-center justify-center gap-2">
							<BiMoneyWithdraw size={20} className="hidden md:block" />{" "}
							Exclusive Price
						</span>
					</div>
				</div>
				<div className="row-span-2 flex flex-col items-start justify-center bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779307/exclusive/public/brand/bbanner1_iyx1be.png')] bg-cover bg-center bg-no-repeat pl-6 text-background md:row-span-3">
					<h3 className="text-base font-extrabold sm:text-2xl md:text-4xl">
						Global Disocunts
					</h3>
					<h4 className="text-xs sm:text-lg md:text-2xl">Get upto 50% off</h4>
				</div>
				<div className="row-span-2 flex flex-col items-start justify-center gap-1 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779304/exclusive/public/brand/bbanner2_hfdra3.png')] bg-cover bg-center bg-no-repeat pl-6 text-background md:row-span-3 md:gap-3">
					<h4 className="font-serif text-base sm:text-xl md:text-3xl">Tarte</h4>
					<h3 className="text-lg font-extrabold sm:text-2xl md:text-4xl">
						Natural Cosmetics
					</h3>
					<p className="text-sm sm:text-xl md:text-3xl">Exclusive Offers</p>
				</div>
			</div>
		</section>
	);
};

export default BrandZone;
