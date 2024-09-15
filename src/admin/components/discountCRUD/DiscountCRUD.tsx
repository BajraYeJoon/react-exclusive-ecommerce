import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";
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

export default function DiscountCRUD() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  });

  const coupons = couponsData?.data || couponsData;

  const addCouponMutation = useMutation({
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

  const deleteCouponMutation = useMutation({
    mutationFn: (id) => Axios.delete(`/coupon/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon deleted successfully");
    },
    onError: () => toast.error("Failed to delete coupon"),
  });

  const onSubmit = (data: any) => {
    if (editingCoupon) {
      updateCouponMutation.mutate({ ...data, id: editingCoupon.id });
    } else {
      addCouponMutation.mutate(data);
    }
  };

  const handleEdit = (coupon: any) => {
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

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      deleteCouponMutation.mutate(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCoupon(null);
    reset();
  };

  // if (isLoading) return <Loading />;

  return (
    <Card className="overflow-x-scroll">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Coupon List
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingCoupon(null);
                  reset();
                }}
              >
                Add New Coupon
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
                      <option value="fixed_Amount">Fixed Amount</option>
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
                          Number.isInteger(Number(value)) ||
                          "Must be an integer",
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Max Usage</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons?.map((coupon: any) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.type}</TableCell>
                <TableCell>{coupon.value}</TableCell>
                <TableCell>{coupon.startDate.split("T")[0]}</TableCell>
                <TableCell>{coupon.expirationDate.split("T")[0]}</TableCell>
                <TableCell>{coupon.maxUsageCount}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(coupon)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
