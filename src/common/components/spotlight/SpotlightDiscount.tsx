export default function SpotlightDiscount() {
	return (
		<>
			<div className="bg-blend flex flex-col items-center justify-center gap-2 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779308/exclusive/public/spotlight/discount_wa5p2f.avif')] bg-cover bg-bottom bg-no-repeat text-white">
				<span className="font-merienda text-sm md:text-2xl">
					Discount Aisle
				</span>
				<div className="items-center text-center font-extrabold uppercase">
					<span className="text-xs md:text-base">Buy 3 get </span>
					<div className="flex items-center justify-center gap-2 text-yellow-300">
						<h4 className="text-3xl md:text-8xl">25 </h4>
						<div className="flex flex-col items-center justify-center font-extrabold">
							<span className="text-base1` md:text-4xl">%</span>
							<span className="text-xs md:text-xl">off</span>
						</div>
					</div>
					<p className="text-xs font-extrabold md:text-lg">
						Buy 2 <span className="text-yellow-300">get 15% off</span>
					</p>
					<p className="text-xs font-extrabold md:text-lg">
						Buy 1 <span className="text-yellow-300">get 10% off</span>
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center text-sm font-medium tracking-wider text-white hover:underline sm:text-base md:text-xl">
				View All Discounts
			</div>
		</>
	);
}
