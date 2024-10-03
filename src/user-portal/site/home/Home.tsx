import {
	Hero,
	SalesCard,
	Category,
	BestProducts,
	ArrivalProductsGrid,
	LimitedEditionCTA,
	GeneralProducts,
	ServiceDetails,
} from "../../pages";
import { Spotlight } from "../../../common/components";
import Faq from "../../components/faq/FAQ";

const offer_gif =
	"https://res.cloudinary.com/dw55twddi/image/upload/v1727926551/exclusive/public/khgif_ebuksr.gif";

const offer_img =
	"https://res.cloudinary.com/dw55twddi/image/upload/v1727926596/exclusive/public/offer_jmqgqo.jpg";

const Home = () => {
	return (
		<div className="relative mx-72 flex flex-col gap-16 overflow-x-hidden  max-2xl:mx-6 max-2xl:gap-14">
			<Hero />
			<SalesCard />
			<img
				src={offer_gif}
				alt="Offer_img"
				className="aspect-auto h-24 object-cover object-left lg:h-auto lg:w-auto"
			/>
			<Category />
			<Spotlight />
			<BestProducts />
			<LimitedEditionCTA />
			<GeneralProducts />
			<img
				src={offer_img}
				alt="Offer_img"
				className="aspect-auto h-24 object-cover object-left lg:h-auto lg:w-auto"
			/>
			<ArrivalProductsGrid />
			<ServiceDetails />
			<Faq />
		</div>
	);
};

export { Home };
