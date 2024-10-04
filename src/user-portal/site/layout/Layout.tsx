import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle, Gift, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { Button } from "../../../common/ui/button";
import { UserRoutes } from "../../utils/userLinks";

export const Loading = () => {
	return (
		<div className="flex h-fit items-center justify-center">
			<LoaderCircle className="h-12 w-12 animate-spin text-primary" />
			<span className="sr-only">Loading...</span>
		</div>
	);
};

const FloatingCard = () => {
	const [isVisible, setIsVisible] = useState(true);
	const navigate = useNavigate();

	const handleOfferClick = () => {
		setIsVisible(false);
		navigate(`${UserRoutes.Discount}`);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed right-4 top-0 z-20"
					initial={{ x: 500, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 500, opacity: 0 }}
					transition={{ type: "spring", stiffness: 100, damping: 15 }}
				>
					<div className="relative mt-[60px] rounded-lg border border-primary bg-white p-4 shadow-lg">
						<button
							type="button"
							onClick={() => setIsVisible(false)}
							className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
						>
							<X size={16} />
						</button>
						<div className="flex items-center space-x-2">
							<Gift className="text-primary" />
							<span className="font-bold text-primary">Dashain Offers!</span>
						</div>
						<p className="mt-2 text-sm">
							Special discounts for Dashain festival!
						</p>
						<Button className="mt-3" onClick={handleOfferClick}>
							View Offers
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const PopupBanner = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const hasSeenBanner = Cookies.get("hasSeenBanner");
		if (!hasSeenBanner) {
			setIsVisible(true);
			Cookies.set("hasSeenBanner", "true", { expires: 1 });
		}
	}, []);

	const closeBanner = () => {
		setIsVisible(false);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-70"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="relative m-4 w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					>
						<X
							size={24}
							onClick={closeBanner}
							className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
						/>

						<div className="mb-4 flex justify-center">
							<img
								src="https://pbs.twimg.com/media/F8Z83E3XcAA0Hsm?format=jpg&name=large"
								alt="Special discount offer"
								className="h-auto w-auto rounded-md lg:h-[500px] lg:w-[500px]"
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Layout = () => {
	return (
		<div className="relative">
			{/* <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#dfe9f3] to-[#ffffff] opacity-80"></div>{" "} */}
			<Banner />
			<Navbar />
			<FloatingCard />
			<PopupBanner />
			<Outlet />
			<Footer />
		</div>
	);
};

export { Layout };
