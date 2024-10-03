import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const router = useNavigate();

	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring" } },
	};
	return (
		<motion.div
			initial="hidden"
			animate="show"
			viewport={{ once: true }}
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: 0.15,
					},
				},
			}}
			className="my-20 flex h-fit flex-col items-center justify-center md:my-32 lg:my-44"
		>
			<motion.h1
				className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				404 Not Found
			</motion.h1>
			<motion.p
				className="mt-6 text-center md:text-2xl"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				You just came to a place in void.
			</motion.p>

			<Button onClick={() => router("/")} className="mt-4">
				Go back to Home
				<HomeIcon className="ml-2" />
			</Button>
		</motion.div>
	);
}
