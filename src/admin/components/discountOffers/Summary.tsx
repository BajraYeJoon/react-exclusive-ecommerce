import { useFormContext } from "react-hook-form";
import { DiscountPreview } from "./DiscountPreview";

const designs = [
  { id: "classic", name: "Classic", gradient: "from-blue-500 to-purple-500" },
  { id: "modern", name: "Modern", gradient: "from-green-400 to-blue-500" },
  { id: "elegant", name: "Elegant", gradient: "from-pink-500 to-red-500" },
];

export default function Summary() {
  const { watch } = useFormContext();
  const {
    name,
    type,
    value,
    code,
    startDate,
    endDate,
    minimumPurchase,
    usageLimit,
    design,
  } = watch();

  const selectedDesign = designs.find((d) => d.id === design) || designs[0];

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="mb-2 text-xl font-semibold">Coupon Details</h3>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Value:</strong>{" "}
            {type === "Percentage" ? `${value}%` : `$${value}`}
          </p>
          <p>
            <strong>Code:</strong> {code}
          </p>
          <p>
            <strong>Status:</strong> Active
          </p>
          <p>
            <strong>Start Date:</strong> {startDate}
          </p>
          <p>
            <strong>End Date:</strong> {endDate}
          </p>
          <p>
            <strong>Minimum Purchase:</strong> ${minimumPurchase}
          </p>
          <p>
            <strong>Usage Limit:</strong> {usageLimit}
          </p>
          <p>
            <strong>Selected Design:</strong> {selectedDesign.name}
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold">Coupon Preview</h3>
          <DiscountPreview
            name={name}
            type={type}
            value={value}
            code={code}
            startDate={startDate}
            endDate={endDate}
            minimumPurchase={minimumPurchase}
            usageLimit={usageLimit}
            gradient={selectedDesign.gradient}
          />
        </div>
      </div>
    </div>
  );
}
