
import { Calendar, Code, DollarSign, Edit, Percent, Trash2, Tag, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/ui/card";
import { Badge } from "../../../common/ui/badge";
import { Button } from "../../../common/ui/button";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { Axios } from "../../../common/lib/axiosInstance";
import { formatDate } from "../../lib/utils/formatDate";
import { Coupon, DiscountDisplayProps } from "./types";

export default function DiscountDisplay({
  handleEdit,
  coupons,
}: Readonly<DiscountDisplayProps>) {
  const queryClient = useQueryClient();
  const deleteCouponMutation = useMutation({
    mutationFn: (id: string) => Axios.delete(`/coupon/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon deleted successfully");
    },
    onError: (error: any) =>
      toast.error(
        (error.response?.data as { message: string })?.message ||
          "Failed to update coupon",
      ),
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {coupons?.map((coupon: Coupon) => (
        <Card
          key={coupon?.id}
          className="overflow-hidden transition-shadow hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-red-400/90 to-red-600 pb-4">
            <CardTitle className="text-lg font-medium tracking-wide text-white">
              {coupon?.name}
            </CardTitle>
            <Badge
              variant={coupon?.type === "percentage" ? "secondary" : "default"}
              className="text-sm font-semibold"
            >
              {coupon?.type === "percentage" ? (
                <Percent className="mr-1 h-3 w-3" />
              ) : (
                <DollarSign className="mr-1 h-3 w-3" />
              )}
              {coupon?.value} {coupon?.type === "percentage" ? "%" : "off"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{coupon?.code}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {formatDate(coupon?.startDate)} -{" "}
                  {formatDate(coupon?.expirationDate)}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                <span>Max Usage: {coupon?.maxUsageCount}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="mr-2 h-4 w-4" />
                <span>Min Purchase: ${coupon?.minPurchaseAmount}</span>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => handleEdit(coupon)}
                className="flex items-center"
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <ConfirmationDialog
                triggerText={
                  <>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </>
                }
                title="Delete Coupon"
                description={`Are you sure you want to delete the coupon "${coupon?.name}"?`}
                onConfirm={() => deleteCouponMutation.mutate(coupon.id)}
                confirmText="Delete"
                cancelText="Cancel"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}