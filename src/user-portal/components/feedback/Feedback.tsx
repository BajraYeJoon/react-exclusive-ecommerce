import { useState } from "react";
import { Button } from "../../../common/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { Label } from "../../../common/ui/label";
import { Textarea } from "../../../common/ui/textarea";
import { useAuthContext } from "../../context/useAuthContext";

export const Feedback = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [feedback, setFeedback] = useState<{ id: number; message: string }[]>(
		() => {
			const savedFeedback = localStorage.getItem("feedback");
			return savedFeedback ? JSON.parse(savedFeedback) : [];
		},
	);
	const { isLoggedIn } = useAuthContext();

	console.log(isLoggedIn, "isLoggedIn");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data: any) => {
		if (!isLoggedIn) {
			toast.error("Please login to give feedback");
			return;
		}

		const newFeedback = { id: feedback.length + 1, message: data.feedback };
		const updatedFeedback = [...feedback, newFeedback];
		setFeedback(updatedFeedback);
		localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
		toast.success("Thank you for your feedback!");
		reset();
		setIsOpen(false);
	};

	return (
		<section className="bg-sky-100 md:gap-3 gap-4 lg:gap-3 flex flex-col items-center justify-center mt-12 py-12 ">
			<h3 className="lg:text-xl md:text-base font-semibold text-sm">
				We are always looking for ways to improve
			</h3>
			<p className="lg:text-base md:text-sm text-xs">
				Let us know what you think
			</p>
			<Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
				<Drawer.Trigger>
					<Button>Give Feedback</Button>
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-black/40" />
					<Drawer.Content className="right-0 top-0 bottom-0 fixed z-30 flex outline-none">
						<div className="bg-zinc-50 rounded-[16px] w-[310px]  mt-2 mr-2 mb-2 p-5 flex flex-col">
							<div className="max-w-md mx-auto">
								<Drawer.Title className="font-medium mb-2 text-zinc-900">
									What would you like to see improved?
								</Drawer.Title>
								<Drawer.Description className="text-zinc-600 mb-2">
									Please let us know what you think.😊
								</Drawer.Description>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mb-4">
										<Label className="block text-sm font-medium text-gray-700">
											Your Feedback
										</Label>
										<Textarea
											{...register("feedback", {
												required: true,
												validate: (value) => !!value.trim(),
											})}
										/>
										{errors.feedback && (
											<span className="text-red-500 text-sm">
												This field is required
											</span>
										)}
									</div>

									<Button type="submit">Submit</Button>
								</form>
							</div>
							{feedback.length > 0 && (
								<div className="rounded-[16px] p-2 border mt-4">
									<h3 className="font-medium text-zinc-900 mb-2">
										Your recente reviews
									</h3>
									<ul className="space-y-2  flex flex-col gap-2 pl-8">
										{feedback.map((item) => (
											<li key={item.id} className="text-zinc-600 list-disc ">
												{item.message}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</section>
	);
};