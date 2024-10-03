import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../../common/lib/utils";

interface NavigationArrowsProps {
	direction?: "prev" | "next";
	className?: string;
}

const NavigationArrows = ({ direction, className }: NavigationArrowsProps) => {
	return (
		<div
			className={cn(
				"group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-card hover:bg-primary md:h-10 md:w-10",
				direction === "prev" ? "left-arrow-button" : "right-arrow-button",
				className,
			)}
		>
			{direction === "prev" ? (
				<ArrowLeft
					className={cn(
						"left-arrow-button h-4 group-hover:text-white md:h-6",
						{},
					)}
				/>
			) : (
				<ArrowRight
					className={cn(
						"right-arrow-button h-4 group-hover:text-white md:h-6",
						{},
					)}
				/>
			)}
		</div>
	);
};

export default NavigationArrows;
