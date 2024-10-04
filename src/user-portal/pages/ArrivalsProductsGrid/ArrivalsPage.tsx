import { fetchNewArrivals } from "../../../common/api/productApi";
import { ProductCard } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../site";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../common/ui/card";
import { Bell } from "lucide-react";
import { Button } from "../../../common/ui/button";

export interface NewArrivalsProductProps {
	id: number;
	title: string;
	description: string;
	price: number;
	image: string;
	discountprice: number;
}

const ArrivalsPage = () => {
	const { data: newArrivals, isLoading } = useQuery({
		queryKey: ["newarrivals"],
		queryFn: fetchNewArrivals,
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className="arrivals-page-container mx-72 mt-10 gap-40 max-2xl:mx-6 max-2xl:gap-28 md:mt-16">
			<div className="arrivals-wrapper grid w-full grid-cols-2 items-center justify-center gap-4 overflow-hidden sm:grid-cols-3 lg:grid-cols-4 lg:justify-start">
				{!newArrivals ? (
					<Card className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
						<CardHeader>
							<CardTitle className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
								No New Arrivals Yet
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<Bell className="mx-auto mb-2 h-12 w-12 text-primary sm:mb-4 sm:h-16 sm:w-16" />
							<p className="mb-2 text-sm sm:mb-4 sm:text-base md:text-lg">
								We're working on bringing you the latest and greatest products.
								Stay tuned for exciting new arrivals!
							</p>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button className="text-sm sm:text-base">
								Get Notified
								<Bell className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
							</Button>
						</CardFooter>
					</Card>
				) : (
					<>
						{newArrivals.map((allproducts: NewArrivalsProductProps) => (
							<ProductCard key={allproducts.id} {...allproducts} />
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default ArrivalsPage;
