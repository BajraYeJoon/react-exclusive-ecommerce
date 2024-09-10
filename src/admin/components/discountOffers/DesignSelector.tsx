import { useFormContext } from "react-hook-form";
import { DiscountPreview } from "./DiscountPreview";
import { Label } from "../../../common/ui/label";

const designs = [
  { id: "classic", name: "Classic", gradient: "from-blue-500 to-purple-500" },
  { id: "modern", name: "Modern", gradient: "from-green-400 to-blue-500" },
  { id: "elegant", name: "Elegant", gradient: "from-pink-500 to-red-500" },
];

export default function DesignSelector() {
  const { watch, register } = useFormContext();
  const {
    name,
    type,
    value,
    code,
    startDate,
    endDate,
    minimumPurchase,
    usageLimit,
  } = watch();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Coupon Design</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {designs.map((designOption) => (
          <div key={designOption.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value={designOption.id}
                id={designOption.id}
                {...register("design")}
              />
              <Label htmlFor={designOption.id}>{designOption.name}</Label>
            </div>
            <DiscountPreview
              name={name}
              type={type}
              value={value}
              code={code}
              startDate={startDate}
              endDate={endDate}
              minimumPurchase={minimumPurchase}
              usageLimit={usageLimit}
              gradient={designOption.gradient}
            />
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500">
        Select a design for your coupon. You can preview the final design in the
        summary.
      </p>
    </div>
  );
}
