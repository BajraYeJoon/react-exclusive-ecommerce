import { Card, CardContent } from "../../../common/ui/card";

interface Props {
  name: string;
  type: "Percentage" | "Fixed Amount";
  value: number;
  code: string;
  startDate: string;
  endDate: string;
  minimumPurchase: number;
  gradient: string;
}

export const DiscountPreview = ({
  name,
  type,
  value,
  code,
  startDate,
  endDate,
  minimumPurchase,
  gradient,
}: Props) => (
  <Card className="mx-auto w-full max-w-sm overflow-hidden">
    <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
      <h3 className="mb-2 text-2xl font-bold">{name || "Coupon Name"}</h3>
      <p className="mb-4 text-4xl font-extrabold">
        {type === "Percentage" ? `${value || 0}% OFF` : `$${value || 0} OFF`}
      </p>
      <p className="mb-2 text-lg">
        Use code:{" "}
        <span className="rounded bg-white px-2 py-1 font-mono text-purple-500">
          {code || "CODE"}
        </span>
      </p>
      <div className="space-y-1 text-sm opacity-75">
        <p>
          Valid: {startDate || "Start Date"} - {endDate || "End Date"}
        </p>
        <p>Minimum Purchase: ${minimumPurchase || 0}</p>
      </div>
    </div>
    <CardContent className="bg-white p-4">
      <p className="text-center text-gray-600">
        Terms and conditions apply. Cannot be combined with other offers.
      </p>
    </CardContent>
  </Card>
);
