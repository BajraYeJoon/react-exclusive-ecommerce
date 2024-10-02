import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Axios } from "../../lib/axiosInstance";
import { CouponDesign1, CouponDesign2, CouponDesign3 } from "./DiscountDesigns";
import { ShoppingBag } from "lucide-react";

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: "fixed_amount" | "percentage";
  value: number;
  startDate: string;
  expirationDate: string;
  minPurchaseAmount: number;
  maxUsageCount: number;
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

  if (!coupons || coupons.length === 0 || error)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-br from-[#BBB3FF]/30 to-purple-50 p-6 shadow-lg md:gap-6 md:p-8 lg:p-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="flex items-center justify-center"
        >
          <ShoppingBag size={64} className="text-primary" />
        </motion.div>

        <h2 className="text-sm font-bold text-gray-800 md:text-base lg:text-2xl">
          No Coupons Available
        </h2>

        <p className="text-center text-sm text-gray-600 md:text-base lg:text-lg">
          Our deals are taking a short break. Check back soon for amazing
          discounts!
        </p>
      </motion.div>
    );

  return (
    <section className="mx-72 my-12 mb-12 max-2xl:mx-6 sm:mb-32 md:mb-44 lg:mb-56">
      <h3 className="mb-8 text-center text-sm font-medium text-gray-800 md:text-xl lg:text-3xl">
        Available Coupons
      </h3>
      <AnimatePresence>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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
    </section>
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
