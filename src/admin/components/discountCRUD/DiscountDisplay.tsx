import { Calendar, Code, Edit, Hash, Percent, Trash2 } from "lucide-react";
import { Button } from "../../../common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { MdDataUsage } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { Coupon } from "../../../common/components/discount/DiscountCard";

const DiscountDisplay = ({
  handleEdit,
  coupons,
  deleteCouponMutation,
}: {
  handleEdit: any;
  coupons: Coupon[] | undefined;
  deleteCouponMutation: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {coupons?.map((coupon: Coupon) => (
        <Card key={coupon.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
            <CardTitle className="text-sm font-medium tracking-wide md:text-base lg:text-xl">
              {coupon.name}
            </CardTitle>
            <div className="flex flex-row items-center justify-center md:flex-col">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(coupon)}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <ConfirmationDialog
                triggerText={<Trash2 className="h-4 w-4" />}
                title="Delete Coupon"
                description="Are you sure you want to delete this coupon?"
                onConfirm={() => deleteCouponMutation.mutate()}
                confirmText="Delete"
                cancelText="Cancel"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span className="text-sm font-semibold md:text-base">
                {coupon.code}
              </span>
            </div>
            <div className="flex items-center">
              {coupon.type === "percentage" ? (
                <Percent className="mr-2 h-4 w-4" />
              ) : (
                <Hash className="mr-2 h-4 w-4" />
              )}
              <span>
                {coupon.value} {coupon.type === "percentage" ? "%" : "off"}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="text-xs md:text-sm">
                {new Date(coupon.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                -
                {new Date(coupon.expirationDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <MdDataUsage className="mr-2 h-4 w-4" />
              <span className="text-xs font-medium md:text-sm">Max Usage:</span>
              <span className="ml-2">{coupon.maxUsageCount}</span>
            </div>
            <div className="flex items-center">
              <BiPurchaseTag className="mr-2 h-4 w-4" />
              <span className="text-xs font-medium md:text-sm">
                Minimum Purchase:
              </span>
              <span className="ml-2">${coupon.minPurchaseAmount}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DiscountDisplay;
