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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import { Axios } from "../../../common/lib/axiosInstance";
import { AxiosError } from "axios";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { Calendar, Edit, Hash, Percent, PlusCircle, Tag, Trash2 } from "lucide-react";

export default function DiscountCRUD() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, setValue } = useForm()

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  })

  const coupons = couponsData?.data || couponsData

  const addCouponMutation = useMutation({
    mutationFn: (newCoupon) => Axios.post("/coupon", newCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      toast.success("Coupon added successfully")
      reset()
      setIsDialogOpen(false)
    },
    onError: () => toast.error("Failed to add coupon"),
  })

  const updateCouponMutation = useMutation<void, AxiosError, { id: string }>({
    mutationFn: (updatedCoupon) =>
      Axios.patch(`/coupon/${updatedCoupon.id}`, updatedCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      toast.success("Coupon updated successfully")
      setEditingCoupon(null)
      reset()
      setIsDialogOpen(false)
    },
    onError: () => toast.error("Failed to update coupon"),
  })

  const deleteCouponMutation = useMutation({
    mutationFn: (id) => Axios.delete(`/coupon/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      toast.success("Coupon deleted successfully")
    },
    onError: () => toast.error("Failed to delete coupon"),
  })

  const onSubmit = (data: any) => {
    if (editingCoupon) {
      updateCouponMutation.mutate({ ...data, id: editingCoupon.id })
    } else {
      addCouponMutation.mutate(data)
    }
  }

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon)
    Object.keys(coupon).forEach((key) => {
      if (key === "startDate" || key === "expirationDate") {
        setValue(key, coupon[key].split("T")[0])
      } else {
        setValue(key, coupon[key])
      }
    })
    setIsDialogOpen(true)
  }


  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingCoupon(null)
    reset()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discount Coupons</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCoupon(null)
                reset()
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</DialogTitle>
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
                    <option value="" disabled>Select type</option>
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
                      validate: (value) => Number(value) > 0 || "Value must be greater than 0",
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input type="date" {...register("startDate", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input type="date" {...register("expirationDate", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsageCount">Max Usage Count</Label>
                  <Input
                    type="number"
                    {...register("maxUsageCount", {
                      required: true,
                      min: 0,
                      validate: (value) => Number.isInteger(Number(value)) || "Must be an integer",
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">{editingCoupon ? "Update Coupon" : "Add Coupon"}</Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons?.map((coupon: any) => (
            <Card key={coupon.id} className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex justify-between items-center">
                  <span>{coupon.name}</span>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(coupon)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                 
                    <ConfirmationDialog 
                      triggerText={<Trash2 className="h-4 w-4" />}
                      title="Delete Coupon"
                      description="Are you sure you want to delete this coupon?"
                      onConfirm={() => deleteCouponMutation.mutate(coupon.id)}
                      confirmText="Delete"
                      cancelText="Cancel"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{coupon.code}</span>
                </div>
                <div className="flex items-center">
                  {coupon.type === 'percentage' ? (
                    <Percent className="h-4 w-4 mr-2" />
                  ) : (
                    <Hash className="h-4 w-4 mr-2" />
                  )}
                  <span>{coupon.value} {coupon.type === 'percentage' ? '%' : 'off'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
  {new Date(coupon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - 
  {new Date(coupon.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Max Usage:</span>
                  <span className="ml-2">{coupon.maxUsageCount}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
