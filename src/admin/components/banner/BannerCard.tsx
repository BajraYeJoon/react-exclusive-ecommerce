import { useMutation } from "@tanstack/react-query";
import { Banner } from "./Banner";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { Trash2Icon } from "lucide-react";

interface BannerCardProps {
	banner: Banner;
	deleteBannerMutation: ReturnType<typeof useMutation<void, Error, number>>;
}

export const BannerCard = ({
	banner,
	deleteBannerMutation,
}: BannerCardProps) => (
	<div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
		<img
			src={banner?.image[0]}
			alt={banner?.title}
			className="h-24 w-full object-cover md:h-48"
		/>
		<div className="p-2 md:p-4">
			<h2 className="mb-2 text-sm font-semibold text-gray-800 md:text-base">
				{banner.title}
			</h2>
			<span className="text-xs font-medium text-gray-600">{banner?.brand}</span>
		</div>
		<div className="flex flex-col justify-between gap-2 p-2 md:flex-row">
			<ConfirmationDialog
				triggerText={
					<>
						<Trash2Icon className="mr-2" size={14} /> Delete
					</>
				}
				title="Delete Banner"
				description="Are you sure you want to delete this banner?"
				onConfirm={() => deleteBannerMutation.mutate(banner.id)}
				confirmText="Delete"
				cancelText="No"
			/>
		</div>
	</div>
);
