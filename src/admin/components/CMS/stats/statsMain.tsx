import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { StatsDisplay } from "./statsDisplay";
import { Button } from "../../../../common/ui/button";
import {
	addStats,
	updateStats,
	fetchStats,
	deleteStats,
} from "../../../../common/api/cms/stats";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogClose,
} from "../../../../common/ui/dialog";
import { Input } from "../../../../common/ui/input";
import { Label } from "../../../../common/ui/label";
import { StatsLoader } from "../../../../common/components/cmsLoader";
import { toast } from "sonner";

export interface Stat {
	id?: number;
	value: string;
	description: string;
}

export default function Stats() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [currentStat, setCurrentStat] = useState<Stat | null>(null);
	const queryClient = useQueryClient();

	const { data: statsData, isLoading } = useQuery<{ data: Stat[] }>({
		queryKey: ["stats"],
		queryFn: fetchStats,
	});

	const stats = statsData?.data || [];

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<Stat>();

	const addMutation = useMutation({
		mutationFn: (newStat: Stat) => addStats(newStat),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stats"] });
			toast.success("Stats added successfully");
			handleDialogClose();
		},
		onError: () => {
			toast.error("Please try again later");
		},
	});

	const updateMutation = useMutation({
		mutationFn: (updatedStat: Stat) => updateStats(updatedStat),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stats"] });
			toast.success("Stats updated successfully");
			handleDialogClose();
		},
		onError: () => {
			toast.error("Please try again later");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteStats(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stats"] });
			toast.success("Stats deleted successfully");
			handleDialogClose();
		},
	});

	const onSubmit = (data: Stat) => {
		if (currentStat && currentStat.id) {
			updateMutation.mutate({ ...currentStat, ...data });
		} else {
			addMutation.mutate(data);
		}
	};

	const handleEdit = (stat: Stat) => {
		setCurrentStat(stat);
		setValue("value", stat.value);
		setValue("description", stat.description);
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
		setCurrentStat(null);
		reset();
	};

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id);
	};

	return (
		<section className="space-y-6">
			<h2 className="mb-4 text-xl font-medium">Manage Stats</h2>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button onClick={() => setCurrentStat(null)}>Add New Stat</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>
						{currentStat ? "Edit Stat" : "Add New Stat"}
					</DialogTitle>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<Label htmlFor="value">Value</Label>
							<Input
								id="value"
								{...register("value", { required: "Value is required" })}
								placeholder="e.g., 100+"
							/>
							{errors.value && (
								<p className="text-sm text-red-500">{errors.value.message}</p>
							)}
						</div>
						<div>
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								{...register("description", {
									required: "Description is required",
								})}
								placeholder="e.g., Happy Customers"
							/>
							{errors.description && (
								<p className="text-sm text-red-500">
									{errors.description.message}
								</p>
							)}
						</div>
						<div className="flex justify-end space-x-2">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									onClick={handleDialogClose}
								>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">
								{currentStat ? "Update Stat" : "Add Stat"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{isLoading ? (
				<StatsLoader />
			) : (
				<StatsDisplay
					stats={stats}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}
		</section>
	);
}
