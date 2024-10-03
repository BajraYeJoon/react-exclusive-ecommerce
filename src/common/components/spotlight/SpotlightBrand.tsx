import { CircleCheckBig } from "lucide-react";

export default function SpotlightBrand() {
	return (
		<>
			<div className="bg-blend relative flex flex-col items-center justify-center gap-2 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779310/exclusive/public/spotlight/brand_fabvai.png')] bg-cover bg-top bg-no-repeat text-white" />
			<div className="flex items-center justify-center text-lg font-extrabold capitalize italic tracking-wider text-white sm:text-xl md:text-3xl">
				Brand Z
				<CircleCheckBig
					className="ml-1 font-extrabold text-yellow-500"
					size={30}
				/>
				ne
			</div>
		</>
	);
}
