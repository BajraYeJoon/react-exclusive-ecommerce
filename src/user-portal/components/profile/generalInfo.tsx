import { useForm } from "react-hook-form";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetails } from "../../api/userApi";
import { toast } from "sonner";

type FormData = {
	firstName?: string;
	lastName?: string;
	phone?: number;
};

export default function GeneralInfo({ userdetail }: any) {
	const { register, handleSubmit, reset } = useForm<FormData>({
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: 0,
		},
	});

	useEffect(() => {
		if (userdetail) {
			reset({
				firstName: userdetail.name?.split(" ")[0] || "",
				lastName: userdetail.name?.split(" ")[1] || "",
				phone: userdetail.phone || "",
			});
		}
	}, [userdetail, reset]);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: updateUserDetails,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["userDetail"] });
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: FormData) => {
		const updatedData = {
			...data,
			name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
		};
		delete updatedData.firstName;
		delete updatedData.lastName;
		mutation.mutate(updatedData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<h2 className="mb-6 text-2xl font-bold">Edit Your Profile</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="firstName" className="mb-1 block">
						First Name
					</label>
					<Input id="firstName" {...register("firstName")} className="w-full" />
				</div>
				<div>
					<label htmlFor="lastName" className="mb-1 block">
						Last Name
					</label>
					<Input id="lastName" {...register("lastName")} className="w-full" />
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="phone" className="mb-1 block">
						Phone
					</label>
					<Input id="phone" {...register("phone")} className="w-full" />
				</div>
			</div>
			<div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
				<Button type="button" variant="outline">
					Cancel
				</Button>
				<Button type="submit">Save Changes</Button>
			</div>
		</form>
	);
}
