import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../common/ui/dialog";
import { Axios } from "../../../common/lib/axiosInstance";
import { AxiosError } from "axios";
import { Loading } from "../../../user-portal/site";
import DiscountDisplay from "./DiscountDisplay";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Coupon } from "../../../common/components/discount/DiscountCard";
import { couponSchema } from "../../schema/discountSchema";

export default function DiscountCRUD() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<Coupon>({
		resolver: zodResolver(couponSchema),
	});

	const { data: couponsData, isLoading } = useQuery({
		queryKey: ["coupons"],
		queryFn: () => Axios.get("/coupon").then((res) => res.data),
	});

	const coupons = useMemo(
		() => (couponsData ? couponsData?.data || couponsData : []),
		[couponsData],
	);

	const addCouponMutation = useMutation<void, AxiosError, Coupon>({
		mutationFn: (newCoupon) => Axios.post("/coupon", newCoupon),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["coupons"] });
			toast.success("Coupon added successfully");
			reset();
			setIsDialogOpen(false);
		},
		onError: (error) =>
			toast.error(
				(error.response?.data as { message: string })?.message ||
					"Failed to add coupon",
			),
	});

	const updateCouponMutation = useMutation<void, AxiosError, { id: string }>({
		mutationFn: (updatedCoupon) =>
			Axios.patch(`/coupon/${updatedCoupon.id}`, updatedCoupon),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["coupons"] });
			toast.success("Coupon updated successfully");
			setEditingCoupon(null);
			reset();
			setIsDialogOpen(false);
		},
		onError: (error) =>
			toast.warning(
				(error.response?.data as { message: string })?.message ||
					"Failed to update coupon",
			),
	});

	const onSubmit: SubmitHandler<Coupon> = (data) => {
		const type = watch("type");
		const value = watch("value");
		const minPurchaseAmount = watch("minPurchaseAmount");

		if (type === "percentage" && value > 30) {
			toast.warning("Percentage value must not exceed 30.");
			return;
		}

		if (type === "fixed_amount" && value > minPurchaseAmount) {
			toast.warning("Value must not exceed the minimum purchase amount.");
			return;
		}

		if (new Date(data?.expirationDate) < new Date(data?.startDate)) {
			toast.warning("Expiration date must be after start date");
			return;
		}

		if (editingCoupon) {
			updateCouponMutation.mutate({ ...data, id: editingCoupon.id });
		} else {
			addCouponMutation.mutate(data);
		}
	};

	const handleEdit = (coupon: Coupon) => {
		setEditingCoupon(coupon);
		Object.keys(coupon).forEach((key) => {
			const couponKey = key as keyof Coupon;
			if (couponKey === "startDate" || couponKey === "expirationDate") {
				setValue(couponKey, coupon[couponKey]?.split("T")[0]);
			} else {
				setValue(couponKey, coupon[couponKey]);
			}
		});
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
		setEditingCoupon(null);
		reset();
	};

	return (
		<div className="coupon-display-wrapper mx-auto p-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Discount Coupons</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							onClick={() => {
								setEditingCoupon(null);
								reset();
							}}
						>
							<PlusCircle className="mr-2 h-4 w-4" /> Add New Coupon
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingCoupon ? "Edit Coupon" : "Add New Coupon"}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										{...register("name", { required: "Name is required" })}
									/>
									{errors.name && (
										<span className="text-sm text-red-500">
											{errors.name.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="code">Code</Label>
									<Input
										{...register("code", { required: "Code is required" })}
									/>
									{errors.code && (
										<span className="text-sm text-red-500">
											{errors.code.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="type">Type</Label>
									<select
										{...register("type", { required: "Type is required" })}
										className="w-full rounded border p-2"
									>
										<option value="" disabled>
											Select type
										</option>
										<option value="fixed_amount">Fixed Amount</option>
										<option value="percentage">Percentage</option>
									</select>
									{errors.type && (
										<span className="text-sm text-red-500">
											{errors.type.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="value">Value</Label>
									<Input
										type="number"
										step="0.01"
										{...register("value", {
											valueAsNumber: true,
											required: "Discount Value is required.",
										})}
									/>
									{errors.value && (
										<span className="text-sm text-red-500">
											{errors.value.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="startDate">Start Date</Label>
									<Input type="date" {...register("startDate")} />
									{errors.startDate && (
										<span className="text-sm text-red-500">
											{errors.startDate.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="expirationDate">Expiration Date</Label>
									<Input type="date" {...register("expirationDate")} />
									{errors.expirationDate && (
										<span className="text-sm text-red-500">
											{errors.expirationDate.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="maxUsageCount">Max Usage Count</Label>
									<Input
										type="number"
										{...register("maxUsageCount", {
											valueAsNumber: true,
											required: "Max usage count is required.",
										})}
									/>
									{errors.maxUsageCount && (
										<span className="text-sm text-red-500">
											{errors.maxUsageCount.message}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="minPurchaseAmount">
										Minimum Purchase Amount
									</Label>
									<Input
										type="number"
										step="0.01"
										{...register("minPurchaseAmount", {
											valueAsNumber: true,
											required: "Please enter minimum purchase amount.",
										})}
									/>
									{errors.minPurchaseAmount && (
										<span className="text-sm text-red-500">
											{errors.minPurchaseAmount.message}
										</span>
									)}
								</div>
							</div>
							<div className="flex justify-end space-x-2">
								<Button type="submit">
									{editingCoupon ? "Update Coupon" : "Add Coupon"}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleDialogClose}
								>
									Cancel
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading ? (
				<Loading />
			) : coupons.length === 0 ? (
				<div className="text-center text-gray-600">No coupons available.</div>
			) : (
				<DiscountDisplay handleEdit={handleEdit} coupons={coupons} />
			)}
		</div>
	);
}
