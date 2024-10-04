import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "../../../common/ui/dialog";
import { Button } from "../../../common/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Drawer } from "vaul";

export const Feedback = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		localStorage.setItem("feedback", JSON.stringify(data));
		toast.success("Thank you for your feedback!");
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
			<Drawer.Root direction="right">
				<Drawer.Trigger>
					<Button>Give Feedback</Button>
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-black/40" />
					<Drawer.Content className="right-0 top-0 bottom-0 fixed z-30 flex outline-none">
						<div className="bg-zinc-50 rounded-[16px] w-[310px] grow mt-2 mr-2 mb-2 p-5 flex flex-col">
							<div className="max-w-md mx-auto">
								<Drawer.Title className="font-medium mb-2 text-zinc-900">
									It supports all directions.
								</Drawer.Title>
								<Drawer.Description className="text-zinc-600 mb-2">
									This one specifically is not touching the edge of the screen,
									but that&apos;s not required for a side drawer.
								</Drawer.Description>
							</div>
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</section>
	);
};
