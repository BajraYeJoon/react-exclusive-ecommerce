import { Link } from "react-router-dom";
import { PagesHeader } from "../../../user-portal/components";
import { UserRoutes } from "../../../user-portal/utils/userLinks";
import { SpotLightHome } from "./SpotLightHome";
import SpotlightDiscount from "./SpotlightDiscount";
import SpotlightHalloween from "./SpotlightHalloween";
import SpotlightBrand from "./SpotlightBrand";

const Spotlight = () => {
	return (
		<section className="spotlight-card-container flex h-fit flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
			<PagesHeader
				Heading="Spotlight"
				subHeading="Discover the latest products from our store"
			/>

			<div className="spotlight-card-selector grid cursor-pointer grid-cols-2 gap-3 *:grid *:h-72 *:w-full *:grid-rows-[2fr_0.8fr] *:bg-gray-400 sm:grid-cols-2 sm:*:h-[400px] lg:grid-cols-4">
				<Link to={`/${UserRoutes.Discount}`}>
					<SpotlightDiscount />
				</Link>
				<Link to={`/${UserRoutes.Spotlight}`}>
					<SpotLightHome />
				</Link>
				<Link to={`/${UserRoutes.Halloweeen}`}>
					<SpotlightHalloween />
				</Link>
				<Link to={`/${UserRoutes.Brands}`}>
					<SpotlightBrand />
				</Link>
			</div>
		</section>
	);
};

export default Spotlight;
