import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { MdDataUsage } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import {
  Calendar,
  Code,
  DollarSign,
  Edit,
  Hash,
  Percent,
  Trash2,
} from "lucide-react";
import { Button } from "../../../common/ui/button";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { Badge } from "../../../common/ui/badge";

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  startDate: string;
  expirationDate: string;
  maxUsageCount: number;
  minPurchaseAmount: number;
}

interface DiscountDisplayProps {
  handleEdit: (coupon: Coupon) => void;
  coupons: Coupon[] | undefined;
  deleteCouponMutation: (id: string) => void;
}

export default function Component({
  handleEdit,
  coupons,
  deleteCouponMutation,
}: DiscountDisplayProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {coupons?.map((coupon) => (
        <Card key={coupon.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-red-400/35 pb-2">
            <CardTitle className="text-base font-medium tracking-wide md:text-xl">
              {coupon.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{coupon.code}</span>
              </div>
              <Badge
                variant={coupon.type === "percentage" ? "default" : "secondary"}
              >
                {coupon.type === "percentage" ? (
                  <Percent className="mr-1 h-3 w-3" />
                ) : (
                  <DollarSign className="mr-1 h-3 w-3" />
                )}
                {coupon.value} {coupon.type === "percentage" ? "%" : "off"}
              </Badge>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(coupon.startDate).toDateString()} -{" "}
                {new Date(coupon.expirationDate).toDateString()}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MdDataUsage className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Max Usage:</span>
              <span className="ml-2">{coupon.maxUsageCount}</span>
            </div>
            <div className="flex items-center text-sm">
              <BiPurchaseTag className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Minimum Purchase:</span>
              <span className="ml-2">${coupon.minPurchaseAmount}</span>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handleEdit(coupon)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <ConfirmationDialog
                triggerText={
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                }
                title="Delete Coupon"
                description={`Are you sure you want to delete the coupon "${coupon.name}"?`}
                onConfirm={() => deleteCouponMutation(coupon.id)}
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
