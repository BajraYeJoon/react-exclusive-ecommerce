import { Carousel } from "../../components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../../common/ui/skeleton";
import { fetchCategories } from "../../../common/api/categoryApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import { motion } from "framer-motion";
interface Category {
	id: number;
	name: string;
	subcategories: string[];
}

const FADE_DOWN_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: -10 },
	show: { opacity: 1, y: 0, transition: { type: "spring" } },
};


const Hero = () => {
	const { data: heroCategoriesData, isLoading } = useQuery({
		queryKey: ["heroCategory"],
		queryFn: fetchCategories,
	});

	const heroCategories =
		(heroCategoriesData && heroCategoriesData.slice(0, 8)) || [];

	return (
		<section className="flex">
			<aside className="z-10 mr-6 mt-14 hidden flex-col items-start gap-4 text-lg text-foreground/80 lg:flex">
				{isLoading ? (
					<div className="mx-auto flex flex-col gap-3">
						{[...Array(7)].map(() => (
							<Skeleton
								className="h-8 md:w-20 lg:w-44"
								key={`skeleton-${uuidv4()}`}
							/>
						))}
					</div>
				) : (
					<motion.ul
						className="flex flex-col gap-3 font-medium tracking-tighter"
						initial="hidden"
						animate="show"
						viewport={{ once: true }}
						variants={{
							show: {
								transition: {
									staggerChildren: 0.1,
								},
							},
						}}
					>
						{heroCategories?.map((category: Category) => (
							<motion.li
								key={category?.id}
								className="group relative cursor-pointer"
							>
								<Link
									to={`/category/${category?.name}/${category?.id}`}
									className="flex items-center justify-between"
								>
									<motion.h3 variants={FADE_DOWN_ANIMATION_VARIANTS}>
										{category?.name}
									</motion.h3>
								</Link>
							</motion.li>
						))}
					</motion.ul>
				)}
			</aside>
			<div className="hidden min-h-full w-px bg-foreground/20 lg:block" />

			<Carousel />
		</section>
	);
};

export default Hero;
