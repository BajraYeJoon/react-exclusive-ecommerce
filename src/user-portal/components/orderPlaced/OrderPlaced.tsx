import confetti from "canvas-confetti";
import { useEffect } from "react";
import Cookies from "js-cookie";

const OrderPlaced = () => {
	useEffect(() => {
		confetti({
			particleCount: 500,
			spread: 90,
			origin: { y: 0.6 },
		});

		Cookies.remove("order-placed");

		return () => {
			setTimeout(() => {
				confetti.reset();
			}, 2000);
		};
	}, []);

	return (
		<section className="py-24">
			<div className="lg-6 mx-auto w-full max-w-7xl px-4 md:px-5">
				<h2 className="text-center text-4xl font-bold leading-10 text-black">
					Payment Successful
				</h2>
				<p className="mb-11 mt-4 text-center text-lg font-normal leading-8 text-gray-500">
					Thanks for making a purchase you can check our order summary from your
					profile
				</p>
			</div>
		</section>
	);
};

export default OrderPlaced;
