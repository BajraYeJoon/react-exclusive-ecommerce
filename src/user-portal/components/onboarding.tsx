import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../common/api/categoryApi";
import { Dialog, DialogContent, DialogHeader } from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { useQuery } from "@tanstack/react-query";
import { UserRoutes } from "../utils/userLinks";

interface Category {
	id: string;
	name: string;
}

const Onboarding = () => {
	const [open, setOpen] = useState(true);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const navigate = useNavigate();

	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	const handleButtonClick = (categoryId: string) => {
		setSelectedCategories((alreadyCategorySelect) => {
			const checked = alreadyCategorySelect.includes(categoryId);

			if (checked) {
				return alreadyCategorySelect.filter((id) => id !== categoryId);
			}
			return [...alreadyCategorySelect, categoryId];
			
		});
	};

	const handleClick = () => {
		localStorage.setItem("categories", JSON.stringify(selectedCategories));
		setOpen(false);
		navigate(`/${UserRoutes.Profile}`);
	};


	return (
		<Dialog open={open} onOpenChange={() => {}}>
			<DialogContent>
				<DialogHeader className="text-2xl">Welcome</DialogHeader>
				<DialogDescription className="flex flex-wrap gap-4">
					<h2>Choose some categories to get started</h2>
					<div className="flex flex-wrap gap-2">
						{categories?.slice(0, 10).map((category: Category) => (
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
				<Button onClick={handleClick}>Let's go</Button>
			</DialogContent>
		</Dialog>
	);
};

export default Onboarding;