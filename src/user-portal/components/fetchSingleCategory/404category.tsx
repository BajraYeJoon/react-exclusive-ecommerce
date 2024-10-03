import { BiLeftArrowAlt } from "react-icons/bi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Button } from "../../../common/ui/button";
import { useNavigate } from "react-router-dom";

const CategoryNotFound = () => {
	const navigate = useNavigate();

	return (
		<section className="container mx-auto flex h-96 items-center px-6 py-12 md:h-[40vh] lg:h-[50vh]">
			<div className="mx-auto flex max-w-sm flex-col items-center text-center">
				<BsExclamationCircleFill size={40} />
				<h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
					Product not found
				</h1>
				<p className="mt-4 text-gray-500 dark:text-gray-400">
					Currently There are no productcs for this category:
				</p>

				<div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
					<Button variant={"outline"} onClick={() => navigate(-1)}>
						<BiLeftArrowAlt />

						<span>Go back</span>
					</Button>

					<Button onClick={() => navigate("/")}>Take me home</Button>
				</div>
			</div>
		</section>
	);
};

export default CategoryNotFound;
