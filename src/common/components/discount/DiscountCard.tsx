import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Axios } from "../../lib/axiosInstance";
import { CouponDesign1, CouponDesign2, CouponDesign3 } from "./DiscountDesigns";
import { RefreshCw, ShoppingBag } from "lucide-react";

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: "fixed_Amount" | "percentage";
  value: number;
  startDate: string;
  expirationDate: string;
}

export interface CouponProps {
  coupon: Coupon;
  onCopy: (code: string) => void;
  isCopied: boolean;
}

export default function DiscountCard() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { data: coupons, error } = useQuery<Coupon[]>({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching coupon data
      </div>
    );

  if (!coupons || coupons.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="mb-6 text-blue-500"
        >
          <ShoppingBag size={64} className="text-primary" />
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          No Coupons Available
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Our deals are taking a short break. Check back soon for amazing
          discounts!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 flex items-center space-x-2 rounded-full bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/75"
          onClick={() => {}}
        >
          <RefreshCw size={20} />
          <span>Refresh</span>
        </motion.button>
      </motion.div>
    );

  return (
    <div>
      <h1 className="mb-8 text-center text-sm font-bold text-gray-800 md:text-xl lg:text-3xl">
        Available Coupons
      </h1>
      <AnimatePresence>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon, index) => (
            <CouponComponent
              key={coupon.id}
              coupon={coupon}
              onCopy={copyCode}
              isCopied={copiedCode === coupon.code}
              designIndex={index}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

const CouponComponent = ({
  designIndex,
  ...props
}: CouponProps & { designIndex: number }) => {
  const designs = [CouponDesign1, CouponDesign2, CouponDesign3];
  const DesignComponent = designs[designIndex % designs.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <DesignComponent {...props} />
    </motion.div>
  );
};



