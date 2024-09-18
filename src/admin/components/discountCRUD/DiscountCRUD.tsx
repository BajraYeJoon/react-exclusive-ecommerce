import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
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


export default function DiscountCRUD() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  interface Coupon {
    id: string;
    name: string;
    startDate: string;
    expirationDate: string;
    [key: string]: string;
  }

  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } = useForm<Coupon>();

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  });

  const coupons = couponsData?.data || couponsData;

  const addCouponMutation = useMutation<void, AxiosError, Coupon>({
    mutationFn: (newCoupon) => Axios.post("/coupon", newCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon added successfully");
      reset();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Failed to add coupon"),
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
    onError: () => toast.error("Failed to update coupon"),
  });

  const onSubmit: SubmitHandler<Coupon> = (data) => {
    if (editingCoupon) {
      updateCouponMutation.mutate({ ...data, id: editingCoupon.id });
    } else {
      addCouponMutation.mutate(data);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    Object.keys(coupon).forEach((key) => {
      if (key === "startDate" || key === "expirationDate") {
        setValue(key, coupon[key].split("T")[0]);
      } else {
        setValue(key, coupon[key]);
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
    <div className="container mx-auto p-4">
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
                  <Input {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input {...register("code", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    {...register("type", { required: true })}
                    className="w-full rounded border p-2"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="fixed_amount">Fixed Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("value", {
                      required: true,
                      min: 0,
                      validate: (value) =>
                        Number(value) > 0 || "Value must be greater than 0",
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    {...register("startDate", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    type="date"
                    {...register("expirationDate", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsageCount">Max Usage Count</Label>
                  <Input
                    type="number"
                    {...register("maxUsageCount", {
                      required: true,
                      min: 0,
                      validate: (value) =>
                        Number.isInteger(Number(value)) || "Must be an integer",
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsageCount">Minium Purchase Amount</Label>
                  <Input
                    type="number"
                    {...register("minPurchaseAmount", {
                      required: true,
                      min: 0,
                      validate: (value) =>
                        Number.isInteger(Number(value)) || "Must be an integer",
                      valueAsNumber: true,
                    })}
                  />
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
      ) : (
        <DiscountDisplay handleEdit={handleEdit} coupons={coupons} />

        // <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        //   {coupons?.map((coupon: any) => (
        //     <Card key={coupon.id} className="overflow-hidden">
        //       <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-red-400/35 pb-2">
        //         <CardTitle className="text-base font-medium tracking-wide md:text-xl">
        //           {coupon.name}
        //         </CardTitle>
        //       </CardHeader>
        //       <CardContent className="space-y-2 p-4">
        //         <div className="flex items-center justify-between">
        //           <div className="flex items-center space-x-2">
        //             <Code className="h-4 w-4 text-muted-foreground" />
        //             <span className="text-sm font-semibold">{coupon.code}</span>
        //           </div>
        //           <Badge
        //             variant={
        //               coupon.type === "percentage" ? "default" : "secondary"
        //             }
        //           >
        //             {coupon.type === "percentage" ? (
        //               <Percent className="mr-1 h-3 w-3" />
        //             ) : (
        //               <DollarSign className="mr-1 h-3 w-3" />
        //             )}
        //             {coupon.value} {coupon.type === "percentage" ? "%" : "off"}
        //           </Badge>
        //         </div>
        //         <div className="flex items-center text-sm">
        //           <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
        //           <span>
        //             {new Date(coupon.startDate).toDateString()} -{" "}
        //             {new Date(coupon.expirationDate).toDateString()}
        //           </span>
        //         </div>
        //         <div className="flex items-center text-sm">
        //           <MdDataUsage className="mr-2 h-4 w-4 text-muted-foreground" />
        //           <span className="font-medium">Max Usage:</span>
        //           <span className="ml-2">{coupon.maxUsageCount}</span>
        //         </div>
        //         <div className="flex items-center text-sm">
        //           <BiPurchaseTag className="mr-2 h-4 w-4 text-muted-foreground" />
        //           <span className="font-medium">Minimum Purchase:</span>
        //           <span className="ml-2">${coupon.minPurchaseAmount}</span>
        //         </div>
        //         <div className="flex items-center justify-between space-x-2">
        //           <Button
        //             variant="secondary"
        //             size="icon"
        //             onClick={() => handleEdit(coupon)}
        //           >
        //             <Edit className="h-4 w-4" />
        //             <span className="sr-only">Edit</span>
        //           </Button>
        //           <ConfirmationDialog
        //             triggerText={
        //               <>
        //                 <Trash2 className="h-4 w-4" />
        //                 Delete
        //               </>
        //             }
        //             title="Delete Coupon"
        //             description={`Are you sure you want to delete the coupon "${coupon.name}"?`}
        //             onConfirm={() => deleteCouponMutation.mutate(coupon.id)}
        //             confirmText="Delete"
        //             cancelText="Cancel"
        //           />
        //         </div>
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>
      )}
    </div>
  );
}
