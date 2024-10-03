import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../common/api/categoryApi";
import { Dialog, DialogContent, DialogHeader } from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { use } from "marked";
import { useQuery } from "@tanstack/react-query";

interface Category {
	id: string;
	name: string;
}

const Onboarding = () => {
	const [open, setOpen] = useState(true);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	const handleButtonClick = (categoryId: string) => {
		setSelectedCategories((alreadyCategorySelect) => {
			const checked = alreadyCategorySelect.includes(categoryId);

			if (checked) {
				return alreadyCategorySelect.filter((id) => id !== categoryId);
			} else {
				return [...alreadyCategorySelect, categoryId];
			}
		});
	};

	const handleClick = () => {
		setSelectedCategories(selectedCategories);
		setOpen(false);
	};

	useEffect(() => {}, []);

	return (
		<Dialog open={open} onOpenChange={() => {}}>
			<DialogContent>
				<DialogHeader className="text-2xl">Welcome</DialogHeader>
				<DialogDescription className="flex flex-wrap gap-4">
					<h2>Choose some categories to get started</h2>
					<div className="flex flex-wrap gap-2">
						{categories?.slice(0, 10).map((category) => (
							<Button
								key={category.id}
								variant={
									selectedCategories.includes(category.id)
										? "default"
										: "secondary"
								}
								onClick={() => handleButtonClick(category.id)}
							>
								{category.name}
							</Button>
						))}
					</div>
				</DialogDescription>
				<Link to="/">
					<Button onClick={handleClick}>Let's go</Button>
				</Link>
			</DialogContent>
		</Dialog>
	);
};

export default Onboarding;