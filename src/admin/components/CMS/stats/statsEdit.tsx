import { useFieldArray, useForm } from "react-hook-form";
import { Stat } from "./statsMain";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";

interface StatsEditProps {
	stats: Stat[];
	onSave: (stats: Stat[]) => void;
	onCancel: () => void;
	maxStats: number;
}

export function StatsEdit({
	stats,
	onSave,
	onCancel,
	maxStats,
}: StatsEditProps) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { stats },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "stats",
	});

	const onSubmit = (data: { stats: Stat[] }) => {
		onSave(data.stats);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{fields.map((field, index) => (
				<div key={field.id} className="flex items-center space-x-2">
					<Input
						{...register(`stats.${index}.value`, {
							required: "Value is required",
						})}
						placeholder="Value"
						className="w-1/4"
					/>
					<Input
						{...register(`stats.${index}.description`, {
							required: "Description is required",
						})}
						placeholder="Description"
						className="w-1/2"
					/>
					<Button
						type="button"
						variant="destructive"
						onClick={() => remove(index)}
					>
						Remove
					</Button>
				</div>
			))}
			{errors.stats && <p className="text-red-500">All fields are required</p>}
			{fields.length < maxStats && (
				<Button
					type="button"
					onClick={() => append({ value: "", description: "" })}
					className="mt-2"
				>
					Add Stat
				</Button>
			)}
			<div className="mt-4 flex justify-end space-x-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">Save Changes</Button>
			</div>
		</form>
	);
}
