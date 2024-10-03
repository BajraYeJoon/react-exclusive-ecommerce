import { useForm } from "react-hook-form";
import { OurStoryContent } from "./aboutMain";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAbout } from "../../../../common/api/cms/about";
import { Label } from "../../../../common/ui/label";
import { Textarea } from "../../../../common/ui/textarea";
import { useState } from "react";

interface OurStoryEditProps {
	content: OurStoryContent;
	onCancel: () => void;
}

export function OurStoryEdit({ content, onCancel }: OurStoryEditProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OurStoryContent>({
		defaultValues: content,
	});

	const queryClient = useQueryClient();

	const [preview, setPreview] = useState<string | ArrayBuffer | null>(
		content.image,
	);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const mutation = useMutation({
		mutationFn: updateAbout,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["about"] });
			onCancel();
		},
	});

	const onSubmit = (data: OurStoryContent) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("body", data.body);
		if (data.image && data.image[0]) {
			formData.append("image", data.image[0]);
		}

		mutation.mutate(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<Label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700"
				>
					Title
				</Label>
				<Input
					id="title"
					{...register("title", { required: "Title is required" })}
					className="mt-1"
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
				)}
			</div>
			<div>
				<Label
					htmlFor="paragraph"
					className="block text-sm font-medium text-gray-700"
				>
					Paragraph 2
				</Label>
				<Textarea
					id="paragraph"
					{...register("body", { required: "Paragraph 2 is required" })}
					className="mt-1 h-fit w-full border"
					rows={4}
				/>
				{errors.body && (
					<p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700"
				>
					Image URL
				</label>
				{content.image && (
					<div className="mt-1">
						<img
							src={preview?.toString() ?? ""}
							alt="Current Image"
							className="mb-2 h-12 w-12"
						/>
						<input
							type="file"
							id="imageUrl"
							accept="image/*"
							{...register("image", {
								validate: {
									validImage: (value) => {
										return (
											(Array.isArray(value) &&
												value[0] instanceof File &&
												value[0]?.type?.startsWith("image/")) ||
											"Only Images are supported"
										);
									},
								},
							})}
							className="block w-fit cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
							onChange={handleImageChange}
						/>
					</div>
				)}
				{errors.image && (
					<p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
				)}
			</div>

			<div className="flex justify-end space-x-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">Save Changes</Button>
			</div>
		</form>
	);
}
