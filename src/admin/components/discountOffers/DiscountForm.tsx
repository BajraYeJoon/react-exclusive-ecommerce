import { useFormContext } from "react-hook-form";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";

export default function DiscountForm() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Discount Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <Label htmlFor="type">Discount Type</Label>
        <select id="type" {...register("type", { required: true })}>
          <option value="Percentage">Percentage</option>
          <option value="Fixed Amount">Fixed Amount</option>
        </select>
      </div>
      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          {...register("value", { required: true, min: 0 })}
        />
      </div>
      <div>
        <Label htmlFor="code">Coupon Code</Label>
        <Input id="code" {...register("code", { required: true })} />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select id="status" {...register("status", { required: true })}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          {...register("startDate", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          {...register("endDate", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="minimumPurchase">Minimum Purchase Amount</Label>
        <Input
          id="minimumPurchase"
          type="number"
          {...register("minimumPurchase", { required: true, min: 0 })}
        />
      </div>
      <div>
        <Label htmlFor="usageLimit">Usage Limit</Label>
        <Input
          id="usageLimit"
          type="number"
          {...register("usageLimit", { required: true, min: 1 })}
        />
      </div>
    </div>
  );
}
